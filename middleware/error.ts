
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    // wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // Duplicate key error
    if (err === 11000) {
        const message = `Diplicate ${Object.keys(err.keyValue)}`
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `JWT is invalid`
        err = new ErrorHandler(message, 400)
    }

    // JWT Expired error
    if (err.name === 'TokenExpiredError') {
        const message = `JWT is expired, try again`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}