import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: userResponse,
                token
            }
        });

    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {

        const { email, password } = req.body;

    if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
}

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user: userResponse
            }
        });

    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        next(error);
    }
};


/*
User clicks Sign Up

        │
        ▼
Start Session
        │
        ▼
Start Transaction
        │
        ▼
Create User
        │
        ▼
Create Wallet
        │
        ▼
Create Profile
        │
        ▼
Everything Successful?
       / \
     Yes  No
      │    │
      ▼    ▼
Commit  Abort
      │    │
      └────┘
        │
        ▼
End Session
        │
        ▼
Send Response / Error

MongoDB Transactions are used to ensure data consistency when performing multiple related database operations. 
A transaction begins with mongoose.startSession() and session.startTransaction(), which create a session and start tracking all operations. 
If every operation succeeds, session.commitTransaction() permanently saves the changes. 
If any operation fails, session.abortTransaction() rolls back all changes, leaving the database unchanged. 
Finally, session.endSession() closes the session. 
Transactions follow the ACID principle (Atomicity, Consistency, Isolation, Durability) 
and are commonly used in scenarios like user registration, banking transactions, order processing,
and booking systems where either all operations should succeed or none should.

MongoDB Transaction

- startSession() → Creates a session to track database operations.
- startTransaction() → Begins the transaction.
- commitTransaction() → Saves all changes if every operation succeeds.
- abortTransaction() → Rolls back all changes if any operation fails.
- endSession() → Closes the session and releases resources.

Used when multiple database operations must either all succeed or all fail (Atomicity).
Example: User Signup, Order Placement, Payment Processing.

*/