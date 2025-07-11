import express from "express";
import userRouter from "./routes/user"
import transactionRouter from "./routes/transfer"
import "./db";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(cors())

app.use(express.json())
app.use(cookieParser())

app.use("/user",userRouter)

app.use("/transit",transactionRouter)

app.listen(3000,function() {
    console.log("Server is running on port 3000.")
})