import { Request, Response, NextFunction } from "express";
import CourserModel from "../models/course.model";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

// CREATE COURSE
export const createCourseService = catchAsyncError(async (data: any, res: Response) => {
   const course = await CourserModel.create(data)
   res.status(201).json({
    success:true,
    course
   })
})

// GET ALL COURSES
export const getAllCoursesServices = async (res: Response) => {
   const courses = await CourserModel.find().sort({ createdAt: -1 })
   
   res.status(200).json({
       success: true,
       data: courses
   })
}





// export const createCourseService = catchAsyncError(async (data: any, res: Response) => {
   
// })
