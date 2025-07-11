import mongoose from "mongoose";
import authMiddleware from "../authMiddleware";
import {User,Account,Transaction} from "../db";
import { transferBody,topupBody } from "../rules";
import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid"

const router = express.Router();


router.post("/transfer",authMiddleware, async function(req,res) {
    const inputPayload = req.body;             
    const parsedPayload = transferBody.safeParse(inputPayload);

    if(!parsedPayload.success) {
        return res.status(403).json({
            error: "Incorrect inputs."
        })
    } 
    try{
        const transactionId = uuidv4()
        const userId = req.user.id;
        const amount = parsedPayload.data.amount;
        const receiverAccountId = parsedPayload.data.receiverAccountId;
        const PIN = parsedPayload.data.PIN;

        const senderAccount = await Account.findOne({
            userId:userId
        })

        const receiverAccount = await Account.findById(receiverAccountId);


        if(!receiverAccount) {
            return res.status(404).json({
                err: "The specified receiver doesn't exist."
            })
        }
        const user = await User.findById(userId);
        const hashedPin = user.pinHash;
        
        const isPinValid = await bcrypt.compare(PIN, hashedPin);
        if (!isPinValid) {
            return res.status(400).json({
                err: "PIN is invalid."
            });
        }
        
        if (senderAccount._id.equals(receiverAccount._id)) {
            return res.status(400).json({ error: "Cannot transfer to your own account." });
        }
        

        if(senderAccount.balance < amount) {
            return res.status(400).json({
                msg:"Insufficient balance."
            })
        }

        const senderAccountId = senderAccount._id;

        const session = await mongoose.startSession()
        try {
             await session.startTransaction();
             
            await  Account.updateOne({
                _id: senderAccountId 
            },{$inc : {balance: -amount}},
            {session}
        )

            await Account.updateOne({
                _id: receiverAccountId,
            },{$inc : {balance: amount}},
            {session}
        )
            const response = await Transaction.create([{
            transactionId: transactionId,
            senderAccountId: senderAccountId,
            receiverAccountId: receiverAccountId,
            amount: amount,
            status: "success",
            transactionType: "send"
        }],{session})
         await session.commitTransaction()
          res.json({
            TransactionId: transactionId,
            amount,
            senderAccountId,
            receiverAccountId,
            status: "success"         //faced issue
          })
        } catch(error) {
            await session.abortTransaction()
            await Transaction.create([{
                transactionId: transactionId,
                senderAccountId: senderAccountId,
                receiverAccountId: receiverAccountId,
                amount: amount,
                status: "fail",
                transactionType: "send"
            }]) 
            return res.status(500).json({ error: "Transaction failed." })
        }
        finally {
            session.endSession();
          }
    } catch(error) {
        res.status(500).json({
            error: "Internal server error."
        })
    }
})

router.get("/transactions", authMiddleware, async function(req,res) {
    try { 
        const userId = req.user.id;
        const limitValue = parseInt(req.query.limit)||10;
        const skipValue = parseInt(req.query.skip)||0; 
        const sortOrder = req.query.order === "asc" ? 1 : -1;

        const response =  await Account.findOne({
            userId: userId
        })

        const accountId = response._id;

        const sentList = await Transaction.find({
            senderAccountId: accountId
        }).sort({createdAt: sortOrder}).limit(limitValue).skip(skipValue)

        const receivedList = await Transaction.find({
            receiverAccountId: accountId
        }).sort({createdAt: sortOrder}).limit(limitValue).skip(skipValue);

        const sentOnes = sentList.map(function(sentItem) {
            return ({
                transactionId: sentItem.transactionId,
                receiverAccountId: sentItem.receiverAccountId,
                amount: sentItem.amount,
                transactionType: "sent",
                transactionTime: sentItem.createdAt
            })
        })

        const receivedOnes = receivedList.map(function(receivedItem) {
            return ({
                transactionId: receivedItem.transactionId,
                senderAccountId: receivedItem.senderAccountId,
                amount: receivedItem.amount,
                transactionType: "receive",
                transactionTime: receivedItem.createdAt
            })
        })

        res.json({
            Sent: sentOnes,
            Received: receivedOnes
        })
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error."
        })
    }
})

router.post("/top-up", authMiddleware, async function(req,res) {
    const inputPayload = req.body;
    const parsedPayload = topupBody.safeParse(inputPayload);
    
    if(!parsedPayload.success) {
        return res.status(403).json({
            error: "Incorrect inputs"
        })
    }
    const amount = parsedPayload.data.amount;
    const userId = req.user.id;
    const transactionId = uuidv4();
    let accountId;

    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        const account = await Account.findOneAndUpdate(
            { userId },
            { $inc: { balance: amount } },
            { new: true, session }
        );

        if (!account) {
            throw new Error("Account not found");
        }

        accountId = account._id;

        await Transaction.create(
            [{
                transactionId,
                senderAccountId: accountId,
                receiverAccountId: accountId,
                amount,
                status: "success",
                transactionType: "top-up"
            }],
            { session }
        );

        await session.commitTransaction();

        return res.json({
            transactionId,
            senderAccountId: accountId,
            receiverAccountId: accountId,
            amount,
            transactionType: "top-up",
            status: "success"
        });

    } catch (error) {
        await session.abortTransaction();

        if (accountId) {
            await Transaction.create([{
                transactionId,
                senderAccountId: accountId,
                receiverAccountId: accountId,
                amount,
                status: "fail",
                transactionType: "top-up"
            }]);
        }

        return res.status(500).json({
            error: "Top-up failed."
        });

    } finally {
        session.endSession();
    }
});

module.exports = {
    transactionRouter : router
}
    