import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from 'cloudinary';
import { createCourseService, getAllCoursesServices } from "../services/course.services";
import { redis } from "../utils/redis";
import CourserModel from "../models/course.model";
import mongoose from "mongoose";
import path from "path";
import ejs from 'ejs'
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import UserModel from "../models/user.model";

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

        const updateCourseById = await CourserModel.findByIdAndUpdate(courseId,
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
            const course = await CourserModel.findById(courseId).select(
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
            const courses = await CourserModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

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
        const courseId = req.params.courseId

        const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId.toString())

        if (!courseExists) {
            return next(new ErrorHandler("User cannot access this course", 400))
        }

        const course = await CourserModel.findById(courseId);
        const courseData = course?.courseData
        res.status(201).json({
            success: true,
            data: courseData
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// ADD QUESTION DISCUSSION ON COURSE
interface AddQuestionDataInterface {
    question: string,
    course_id: string,
    content_id: string
}
export const addQuestionController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, course_id, content_id }: AddQuestionDataInterface = req.body
        const course = await CourserModel.findById(course_id)
        const user = await UserModel.findById(req.user?._id)

        if (!course) {
            return next(new ErrorHandler("Course id is not valid", 400))
        }

        if (!mongoose.Types.ObjectId.isValid(content_id)) {
            return next(new ErrorHandler("Content id is not valid", 400))
        }

        if (!user) {
            return next(new ErrorHandler("User not found", 400))
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(content_id))
        if (!courseContent) {
            return next(new ErrorHandler("Content id is not valid", 400))
        }

        // create new question object
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        }

        // add this question to our course content/course data
        courseContent.questions.push(newQuestion)

        // save the updated course
        await course?.save()

        // Send Notification order to Admin 
        await NotificationModel.create({
            userId: user._id,
            title: "New Question Received",
            message: `New Question was Added. The Video : ${courseContent.title} have one question added by ${user.name}`
        })

        res.status(201).json({
            success: true,
            data: courseContent
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// ADD REPLYING COURSE QUESTION
interface ReplyCourseQuestionInterface {
    reply: string,
    course_id: string,
    content_id: string,
    question_id: string
}
export const replyCourseQuestionController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reply, course_id, content_id, question_id }: ReplyCourseQuestionInterface = req.body

        const course = await CourserModel.findById(course_id)
        if (!mongoose.Types.ObjectId.isValid(content_id)) {
            return next(new ErrorHandler("Content id is not valid", 400))
        }

        // / search courseData with spesific id that want to reply
        const courseContent = course?.courseData.find((courseData: any) => courseData._id.equals(content_id))
        if (!courseContent) {
            return next(new ErrorHandler("Content id is not valid", 400))
        }

        // search question with spesific id that want to reply
        const question = courseContent?.questions.find((question) => question._id.equals(question_id))
        if (!question) {
            return next(new ErrorHandler("Question id is not valid", 400))
        }

        // create quetion object
        const replyQuestion: any = {
            user: req.user,
            reply,
        }

        // Add reply to question
        question.questionReplies?.push(replyQuestion)

        await course?.save()

        if (req.user?._id === question.user?._id) {
            // if the user login === questions owner, send notification
            await NotificationModel.create({
                userId: req.user?._id,
                title: "New Question Reply Received",
                message: `New Question reply was received. The Video : ${courseContent.title} have one question reply by ${req.user?.name}`
            })

        } else {
            // Send Email to notify questions owner that the question has beed reply
            const data = {
                name: question.user.name,
                title: courseContent.title,
            }

            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data)
            try {
                await sendMail({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data
                })
            } catch (error: any) {
                return next(new ErrorHandler(error.message, 400))
            }
        }

        res.status(201).json({
            success: true,
            data: course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// ADD REVIEW IN COURSE
interface AddReviewInterface {
    review: string,
    rating: number,
    user_id: string
}
export const addReviewController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses

        const courseId = req.params.courseId

        // check if courseId already exist in userCourseList based on _id
        const courseExist = userCourseList?.some((item: any) => item._id.toString() === courseId.toString())
        if (!courseExist) {
            return next(new ErrorHandler("Cant access this course", 400))
        }

        const course = await CourserModel.findById(courseId)
        const { review, rating }: AddReviewInterface = req.body
        const reviewObject: any = {
            user: req.user,
            review,
            rating
        }

        course?.reviews.push(reviewObject)

        // Calculate Rating
        let avgRating = 0;
        course?.reviews.forEach((item: any) => {
            avgRating += item.rating
        })

        if (course) {
            course.ratings = avgRating / course?.reviews.length
        }

        await course?.save()

        // Send Notification to course owner
        const notification = {
            title: "New Review Received",
            message: `${req.user?.name} has given a review on your course in ${course?.name}`
        }

        // create notification [LATER]

        res.status(201).json({
            success: true,
            data: course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// REPLY THE REVIEW -- ONLY ADMIN CAN REPLY THE REVIEW
interface AddReplyToReviewInterface {
    comment: string,
    course_id: string,
    review_id: string
}
export const addReplyToReviewController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, course_id, review_id }: AddReplyToReviewInterface = req.body
        const course = await CourserModel.findById(course_id)
        if (!course) {
            return next(new ErrorHandler("Course not found", 400))
        }

        const review = course.reviews.find((item: any) => item._id.toString() === review_id)
        if (!review) {
            return next(new ErrorHandler("Review not found", 400))
        }

        const replyToReview: any = {
            user: req.user,
            comment
        }

        review.reviewReplies?.push(replyToReview)
        await course.save()

        res.status(201).json({
            success: true,
            data: course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GET ALL COURSES --- Only Admin
export const getAllCoursesController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllCoursesServices(res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// DELETE COURSE --- Only Admin
export const deleteCourseController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.courseId

        const course = await CourserModel.findById(id)
        if (!course) {
            return next(new ErrorHandler("Course not found!", 400))
        }

        await course.deleteOne({ _id: id })
        await redis.del(id)

        res.status(201).json({
            success: true,
            message: "Course Deleted Successfully",
            data: []
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