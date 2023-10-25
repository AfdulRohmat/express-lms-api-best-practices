import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import mongoose from "mongoose";
import OrderModel, { OrderInterface } from "../models/order.model";
import UserModel from "../models/user.model";
import CourserModel from "../models/course.model";
import path from "path";
import ejs from 'ejs'
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { createOrderService } from "../services/order.services";


//  CREATE ORDER
interface CreateOderInterface {
    course_id: string,
    payment_info: string
}
export const createOrderController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { course_id, payment_info }: CreateOderInterface = req.body

        const user = await UserModel.findById(req.user?._id)
        if (!user) {
            return next(new ErrorHandler("User not found", 400))
        }

        // Check course if already pruchased
        const courseAlreadyPurchased = user.courses.some((course: any) => course._id.toString() === course_id)
        if (courseAlreadyPurchased) {
            return next(new ErrorHandler("User already purchase this courses", 400))
        }

        const course = await CourserModel.findById(course_id)
        if (!course) {
            return next(new ErrorHandler("Course not found", 400))
        }

        const orderData: any = {
            courseId: course._id,
            userId: user?._id,
            paymentInfo: ''
        }

        // Send Confirmation Email After Order
        const mailData = {
            order: {
                _id: course._id,
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) // Indonesia
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData })
        try {
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData
                })
            }

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }

        // Add Course Id to User Courses Array after purchased
        user?.courses.push(course?._id);
        await user?.save()

        // Send Notification order to Admin 
        await NotificationModel.create({
            userId: user._id,
            title: "New Order",
            message: `New Order Confirmed. The Course : ${course.name} has been ordered`
        })

        // Update Purchased value on Course
        course.purchased ? course.purchased += 1 : course.purchased
        await course.save()

        // Create Order
        createOrderService(orderData, res, next)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// export const activationUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })