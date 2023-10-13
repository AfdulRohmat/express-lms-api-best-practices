import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from 'cloudinary';
import { createCourseService } from "../services/course.services";
import courserModel from "../models/course.model";
import { redis } from "../utils/redis";

// UPLOAD COURSE / CREATE COURSE
export const uploadCourseController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses/thumbnail"
            })

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        createCourseService(data, res, next)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// EDIT COURSE 
export const editCourseController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail
        const courseId = req.params.id

        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id)

            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses/thumbnail"
            })

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        const updateCourseById = await courserModel.findByIdAndUpdate(courseId,
            {
                $set: data,
            },
            {
                new: true
            }
        )

        res.status(201).json({
            success: true,
            data: updateCourseById
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GET SINGLE COURSE ----- WITHOUT PURCHASING (COURSE THAT CAN ACCESS FOR EVERY USER THAT NOT PURCHASE YET)
export const getSingleCourseWithoutPurchasingController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id

        // Get Data Chacing form Redis if exist
        const dataCacheRedis = await redis.get(courseId)
        if (dataCacheRedis) {
            const course = JSON.parse(dataCacheRedis)
            res.status(201).json({
                success: true,
                data: course
            })
        } else {
            const course = await courserModel.findById(courseId).select(
                "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
            );

            // save data to redis for chacing
            await redis.set(courseId, JSON.stringify(course))

            res.status(201).json({
                success: true,
                data: course
            })
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GET ALL COURSES ----- WITHOUT PURCHASING (COURSES THAT CAN ACCESS FOR EVERY USER THAT NOT PURCHASE YET)
export const getAllCoursesWithoutPurchasingController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get Data Chacing form Redis if exist
        const dataCacheRedis = await redis.get("all_courses")
        if (dataCacheRedis) {
            const courses = JSON.parse(dataCacheRedis)
            res.status(201).json({
                success: true,
                data: courses
            })
        } else {
            const courses = await courserModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

            // save data to redis for chacing
            await redis.set("all_courses", JSON.stringify(courses))

            res.status(201).json({
                success: true,
                data: courses
            })
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GET COURSE CONTENT ----- ONLY FOR VALID USER
export const getCourseByUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses
        const courseId = req.params.id

        const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId)

        if (!courseExists) {
            return next(new ErrorHandler("User cannot access this course", 400))
        }

        const course = await courserModel.findById(courseId);
        const courseData = course?.courseData
        res.status(201).json({
            success: true,
            data: courseData
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