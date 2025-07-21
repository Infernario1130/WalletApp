import express from "express";
import {userRouter} from "./routes/user.js"
import {transactionRouter} from "./routes/transfer.js"
import "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
;

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/user",userRouter)

app.use("/transit",transactionRouter)

app.listen(3000,function() {
    console.log("Server is running on port 3000.")
})