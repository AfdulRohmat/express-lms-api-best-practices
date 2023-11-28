import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import mongoose from "mongoose";
import NotificationModel from "../models/notification.model";
import cron from 'node-cron';

// GET ALL NOTIFICATION -- Only Admin
export const getAllNotificationController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // sort/urutkan semua data dari scr descending (dari bawah) karena data terbaru berada pada urutan terakhir
        const notification = await NotificationModel.find().sort({ createdAt: -1 })
        res.status(201).json({
            success: true,
            data: notification
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// UPDATE NOTIFICATION STATUS
export const updateNotificationStatusController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = req.params.notificationId
        const notification = await NotificationModel.findById(notificationId)
        if (!notification) {
            return next(new ErrorHandler("Notification not found", 400))
        }
        notification.status ? notification.status = 'read' : notification.status
        await notification.save()

        // const allNotifications = await NotificationModel.find().sort({ createdAt: -1 })

        res.status(201).json({
            success: true,
            message: "Success update status",
            data: notification
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// AUTO DELETE DELETE NOTIFICATION AFTER A MONTH WITH CRON JOB (TASK SCHEDULER) -- ADMIN ONLY
cron.schedule("0 0 0 * * *", async () => {
    const thrtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({
        status: "read",
        createdAt: {
            $lt: thrtyDayAgo
        }
    })
    console.log('Deteled read notification')
})


// export const editCourseController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })