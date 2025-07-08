Wallet Application - Secure & Simple Digital Wallet Backend

A robust, production-grade backend API for a digital wallet application. Built with Node.js, Express, MongoDB, and JWT-based authentication, this system handles user onboarding, secure wallet top-ups, PIN-based transfers, transaction history, and account protection features like PIN change and sign-out.

🚀 Features

✅ User Signup & Signin (with hashed passwords and PINs)
🔐 JWT-based Authentication with access & refresh tokens
💸 Wallet Top-Up
🔁 PIN-Protected Fund Transfers
🧾 Transaction History (with sent/received separation, pagination & sorting)
🔁 Change PIN
🚪 Secure Sign-Out
📦 Clean Modular Codebase (middlewares, route-based architecture)


Project Structure

backend/
├── node_modules/
├── src/
│   ├── middlewares/
│   │   └── authMiddleware.js      # JWT verification
│   ├── routes/
│   │   ├── auth.js                # Signin, Signup, Change PIN, /me
│   │   ├── transfer.js            # Fund transfers, transaction 
│   │   └── user.js                # User profile and data ,Change PIN
│   ├── db.js                      # MongoDB schemas
│   ├── index.js                   # Express app entry point
│   └── rules.js                   # Zod schemas for validation
├── .env                           # Environment variables (JWT_SECRET, DB URI)
├── package.json
├── package-lock.json
└── nodemon.json


Tech Stack

Layer	Tech
Runtime	Node.js
Framework	Express.js
Database	MongoDB with Mongoose
Auth	JWT (Access + Refresh Tokens)
Hashing	bcrypt (for password and PIN)
Validation	Zod
Security	Cookie-based refresh tokens, PIN verification
Utils	UUID

 API Endpoints (Key Highlights)

✅ Auth
POST /signup — Create user + wallet
POST /signin — Generate tokens
GET /me — Get user profile
PUT /change-pin — Update wallet PIN
GET /sign-out — Clear refresh token cookie
💸 Wallet
POST /top-up — Add funds
POST /transfer — Send funds (PIN protected)
GET /transactions?limit=&skip=&order= — View sent/received history with pagination/sorting


 Security Highlights

All sensitive data (passwords, PINs) are securely hashed using bcrypt
Authenticated requests require valid JWT in the Authorization header
Refresh token stored in HttpOnly, Secure Cookie
All wallet transactions are wrapped in MongoDB sessions to ensure atomicity
Validation is enforced using Zod on every incoming request body.

Future Enhancements

🧾 Razorpay / Stripe integration for real-world payments
🛡 Rate Limiting & Brute Force Protection
🧠 Role-based Access Control (RBAC)


Setup Instructions:

1. Clone the repo:
 git clone https://github.com/Infernario1130/WalletApp.git
 cd wallet-backend


2. Install dependencies:
npm install


3. Set up environment:
Create a .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

4. Run the server:
npm run dev
