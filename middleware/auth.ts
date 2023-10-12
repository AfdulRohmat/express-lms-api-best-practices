import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';
import { redis } from "../utils/redis";

dotenv.config();

// AUTHENTICATED USER
export const isAuthenticated = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string
    if (!access_token) {
        return next(new ErrorHandler("Please login first to access this resource", 400))
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload
    if (!decoded) {
        return next(new ErrorHandler("Invalid access_token", 400))
    }

    const user = await redis.get(decoded.id)
    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }

    // Before it, req.user is invalid typescript type. To solve this, create custom declare in @types folder
    req.user = JSON.parse(user)

    next()
})

// VALIDATE USER ROLE
export const authorizeRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(new ErrorHandler(`Role '${req.user?.role}' is not allowed to access this route`, 400))
        }
        next()
    }
}