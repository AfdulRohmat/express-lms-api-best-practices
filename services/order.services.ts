import { catchAsyncError } from "../middleware/catchAsyncError"
import CourserModel from "../models/course.model";
import OrderModel from "../models/order.model"
import { Request, Response, NextFunction } from "express";


// CREATE ORDER
export const createOrderService = catchAsyncError(async (data: any, res: Response) => {
    const order = await OrderModel.create(data)
    res.status(201).json({
     success:true,
     data: order
    })
 })

 
// export const createCourseService = catchAsyncError(async (data: any, res: Response) => {
   
// })