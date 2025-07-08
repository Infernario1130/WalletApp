import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
const router = express.Router();

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