import {rateLimit} from "express-rate-limit";

function requestLimiter() {
    return rateLimit({
        windowMs: 5*60*1000,
        limit:10,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many requests, please try again later.",
        statusCode: 429,
        skipFailedRequests: false,
        skipSuccessfulRequests: false
    })
}

export default requestLimiter;