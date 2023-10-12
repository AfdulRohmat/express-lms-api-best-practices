import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';

dotenv.config();

export const app = express()

// body parser
app.use(express.json({ limit: "50mb" })) // For limit in cloudinary upload

// cookie parser
app.use(cookieParser())

// cors
app.use(cors({
    origin: process.env.ORIGIN
}))

// Routes
app.use("/api/v1", userRouter)

// error Middleware
app.use(errorMiddleware)

