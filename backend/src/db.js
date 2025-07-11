import "dotenv/config";
import mongoose from "mongoose";


async function databaseConnector() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing.");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection to database is established.");
    } catch (error) {
        console.log("Connection to database failed. " + error);
    }
}

databaseConnector();


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minLength: [3, "Minimum character limit is 3."]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "email ID is required."],
        minLength: [11, "Minimum character limit is 11."],
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    upiId: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: [10, "Minimum character limit is 10."],
        required: [true, "upiId is required."],
        unique: [true, "upiId already exists."]
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    
    pinHash: {
        type: String,
        minLength: [4, "PIN should have minimum 4 characters."],
        maxLength: [6, "PIN should have maximum 6 characters."]
    }
}, { 
    timestamps: true 
});


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, "Balance must be at least 0 or above 0."]
    },
    status: {
        type: String,
        enum: ["active","frozen","suspended"],
        default: "active"
    }
}, {
    timestamps: true
});


const transactionSchema = new mongoose.Schema({
    transactionId:{
        type: String,
        unique: true
    },
    senderAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    receiverAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    amount: {
        type: Number
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    transactionType: {
        type: String,
        enum: ["send","receive","top-up"],
        required: true
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

export {
    User,
    Account,
    Transaction
};
