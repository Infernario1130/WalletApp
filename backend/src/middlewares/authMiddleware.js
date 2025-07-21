import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET found in .env.");
}

const secretKey = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        res.status(401).json({
            error: "Authorization header is missing.",
        });
        return;
    }

    const words = token.split(" ");
    const jwtToken = words[1];

    try {
        const decodedValue = jwt.verify(jwtToken, secretKey);
        req.user = decodedValue;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "Token expired",
            });
        } else {
            return res.status(401).json({ error: "Token invalid." });
        }
    }
}

export default authMiddleware;
