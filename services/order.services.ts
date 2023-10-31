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

 // GET ALL ORDERS
export const getAllOrderServices = async (res: Response) => {
    const orders = await OrderModel.find().sort({ createdAt: -1 })
    
    res.status(200).json({
        success: true,
        data: orders
    })
}

 
// export const createCourseService = catchAsyncError(async (data: any, res: Response) => {
   
// })