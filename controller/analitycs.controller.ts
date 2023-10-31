import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import mongoose from "mongoose";
import { generateLast12MonthsData } from "../utils/analitycs.generator";
import UserModel from "../models/user.model";
import CourserModel from "../models/course.model";
import OrderModel from "../models/order.model";

// GET USER ANALITYCS -- Only Admin
export const getUsesrAnalitycsController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await generateLast12MonthsData(UserModel)
        res.status(201).json({
            success: true,
            data: users
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GET COURSES ANALITYC
export const getCoursesAnalitycsController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await generateLast12MonthsData(CourserModel)
        res.status(201).json({
            success: true,
            data: courses
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GET ORDERS ANALITYCS
export const getOrdersAnalitycsController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await generateLast12MonthsData(OrderModel)
        res.status(201).json({
            success: true,
            data: orders
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})



// export const editCourseController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })