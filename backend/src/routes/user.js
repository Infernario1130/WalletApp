import authMiddleware from "../middlewares/authMiddleware";
import {User,Account} from "../db";
import bcrypt from "bcrypt";
import express from "express";
import {signUpBody,signInBody,changePinBody} from "../rules";
import jwt from "jsonwebtoken";
import rateLimiter from "../middlewares/rateLimiter"

if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET found in .env")
}

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET;
app.useso

router.post("/signup",rateLimiter ,async function(req,res,) {
   
    try {
       const inputPayload = req.body;
       const parsedPayload = signUpBody.safeParse(inputPayload);
       if(!parsedPayload.success) {
         return res.status(403).json({
            error: "Incorrect inputs."
        })
       }

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const upiId = req.body.upiId;
        const PIN = req.body.PIN;

        const hashedPassword = await bcrypt.hash(password,12);
    
        const hashedPIN = await bcrypt.hash(PIN,12)
    
        const newUser = await User.create({
            name: name,
            email: email,
            passwordHash: hashedPassword,
            upiId: upiId,
            pinHash: hashedPIN
         })

        const newAccount = await Account.create({
            userId: newUser._id,
            balance: Math.floor(Math.random()*100),
            status: "active"
        })

        res.json({
            msg: "User Id and wallet account created."
        })

    } catch (error) {
        res.status(500).json({
            error: "Internal server error."
        })
    }
})

router.post("/signin", rateLimiter ,async function(req,res) {
    try {
            const inputPayload = req.body;
            const parsedPayload = signInBody.safeParse(inputPayload);

            if(!parsedPayload.success) {
                return res.status(403).json({
                    error: "Incorrect inputs."
                })
            }

            const email = req.body.email;
            const password = req.body.password;

            const userData = await User.findOne({
                email:email
            })

            if(!userData) {
                return res.status(404).json({
                    error: "User not found."
                })
            }

            const hashedPassword = userData.passwordHash

            const response = await bcrypt.compare(password,hashedPassword)

            if (!response) {
                return res.status(401).json({
                    error: "Invalid credentials."
                })
            } 

            const accessToken = jwt.sign({
                id: userData._id,email:userData.email
            },JWT_SECRET,{
                expiresIn: "1h"
            })

            const refreshTokens = jwt.sign({
                id: userData._id,email: userData.email
            },JWT_SECRET,{
                expiresIn: "7d"
            })

            res.cookie("refreshTokens",refreshTokens,{
                httpOnly: true,
                path: "/",
                secure: true,
                sameSite: "none",
                maxAge: 7*24*60*60*1000
            })

            res.json({
                accessToken
            })

    } catch(error) {
            res.status(401).json({
                error: "Invalid credentials."
            })
        }
    })
    router.get("/me",authMiddleware, async function(req,res) {
                
       try {const userId = req.user.id;
            const user = await User.findOne({
            userId: userId 
            })

            if(!user) {
                return res.status(404).json({
                    error: "User not found."
                })
            }

            const account = await Account.findOne({
                userId: userId
            })
            if (!account) {
                return res.status(404).json({
                    error: "Account not found"
                })
            }

            res.json({
                userId: userId,
                name: user.name,
                email: user.email,
                upiId: user.upiId,
                accountId: account._id,
                balance: account.balance,
                status: account.status
            })
       } catch (error) {
            res.status(500).json({
                error: "Internal server error."
            })
       }
    });

    router.put("/change-pin",rateLimiter ,authMiddleware, async function(req,res) {
        const inputPayload = req.body;
        const parsedPayload = changePinBody.safeParse(inputPayload);

        if (!parsedPayload.success) {
            return res.status(400).json({
                error: "Input not valid."
            })
        } 

        const userId = req.user.id;
        const oldPin = parsedPayload.data.oldPin;
        const newPin = parsedPayload.data.newPin;

        try { const user = await User.findOne({
            _id: userId
        })

            if (!user) {
                return res.status(404).json({
                    error: "User not found."
                })
            }

            const hashedPIN = user.pinHash

            const response = await bcrypt.compare(oldPin,hashedPIN)
            if (!response) {
            return res.status(400).json({
                error: "Invalid PIN"
            })
          }
            
          if (oldPin === newPin) {
            return res.status(400).json({
                error: "New PIN cannot be same as the old PIN."
            })
        }

            const updatedHashedPIN = await bcrypt.hash(newPin,12);

            await User.findByIdAndUpdate(
                userId,
            {
                $set: {pinHash:updatedHashedPIN}
            })
            
            return res.json({
                message: "PIN updated successfully."
            })
        } catch (error) {
            res.status(500).json({
                error: "Internal server error."
            })
        }

    })


    router.post("/refresh-token", async function(req,res) {
        try {
            const token  = req.cookies.refreshTokens;
            
            if(!token) {
                return res.status(401).json({
                    error: "Refresh token missing."
                })
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            const newAccessToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );

              const newRefreshToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
              );  

              res.cookie("refreshTokens",newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                path: "/",
                maxAge: 7*24*60*60*1000
              })
              res.json({
                accessToken: newAccessToken
              })
        } catch (error) {
            return res.status(403).json({
                error: "Invalid refresh token"
            })
        }
    })

    router.post("/sign-out", authMiddleware , function(req,res) {
        res.clearCookie("refreshTokens",{
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "none",
            maxAge: 0
    
        });
        res.json({
            msg: "User successfully signed-out."
        })
    })

    module.exports = {
        userRouter: router
    }