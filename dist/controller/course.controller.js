"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseController = exports.getAllCoursesController = exports.addReplyToReviewController = exports.addReviewController = exports.replyCourseQuestionController = exports.addQuestionController = exports.getCourseByUserController = exports.getAllCoursesWithoutPurchasingController = exports.getSingleCourseWithoutPurchasingController = exports.editCourseController = exports.uploadCourseController = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_services_1 = require("../services/course.services");
const redis_1 = require("../utils/redis");
const course_model_1 = __importDefault(require("../models/course.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// UPLOAD COURSE / CREATE COURSE
exports.uploadCourseController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses/thumbnail"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        (0, course_services_1.createCourseService)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// EDIT COURSE 
exports.editCourseController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        if (thumbnail) {
            yield cloudinary_1.default.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses/thumbnail"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        const updateCourseById = yield course_model_1.default.findByIdAndUpdate(courseId, {
            $set: data,
        }, {
            new: true
        });
        res.status(201).json({
            success: true,
            data: updateCourseById
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET SINGLE COURSE ----- WITHOUT PURCHASING (COURSE THAT CAN ACCESS FOR EVERY USER THAT NOT PURCHASE YET)
exports.getSingleCourseWithoutPurchasingController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        // Get Data Chacing form Redis if exist
        const dataCacheRedis = yield redis_1.redis.get(courseId);
        if (dataCacheRedis) {
            const course = JSON.parse(dataCacheRedis);
            res.status(201).json({
                success: true,
                data: course
            });
        }
        else {
            const course = yield course_model_1.default.findById(courseId).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            // save data to redis for chacing
            yield redis_1.redis.set(courseId, JSON.stringify(course), 'EX', 604800); // will removed after 7 days
            res.status(201).json({
                success: true,
                data: course
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET ALL COURSES ----- WITHOUT PURCHASING (COURSES THAT CAN ACCESS FOR EVERY USER THAT NOT PURCHASE YET)
exports.getAllCoursesWithoutPurchasingController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get Data Chacing form Redis if exist
        const dataCacheRedis = yield redis_1.redis.get("all_courses");
        if (dataCacheRedis) {
            const courses = JSON.parse(dataCacheRedis);
            res.status(201).json({
                success: true,
                data: courses
            });
        }
        else {
            const courses = yield course_model_1.default.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            // save data to redis for chacing
            yield redis_1.redis.set("all_courses", JSON.stringify(courses));
            res.status(201).json({
                success: true,
                data: courses
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET COURSE CONTENT ----- ONLY FOR VALID USER
exports.getCourseByUserController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.courseId;
        const courseExists = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.find((course) => course._id.toString() === courseId.toString());
        if (!courseExists) {
            return next(new ErrorHandler_1.default("User cannot access this course", 400));
        }
        const course = yield course_model_1.default.findById(courseId);
        const courseData = course === null || course === void 0 ? void 0 : course.courseData;
        res.status(201).json({
            success: true,
            data: courseData
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.addQuestionController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { question, course_id, content_id } = req.body;
        const course = yield course_model_1.default.findById(course_id);
        const user = yield user_model_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
        if (!course) {
            return next(new ErrorHandler_1.default("Course id is not valid", 400));
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(content_id)) {
            return next(new ErrorHandler_1.default("Content id is not valid", 400));
        }
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 400));
        }
        const courseContent = (_c = course === null || course === void 0 ? void 0 : course.courseData) === null || _c === void 0 ? void 0 : _c.find((item) => item._id.equals(content_id));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Content id is not valid", 400));
        }
        // create new question object
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: []
        };
        // add this question to our course content/course data
        courseContent.questions.push(newQuestion);
        // save the updated course
        yield (course === null || course === void 0 ? void 0 : course.save());
        // Send Notification order to Admin 
        yield notification_model_1.default.create({
            userId: user._id,
            title: "New Question Received",
            message: `New Question was Added. The Video : ${courseContent.title} have one question added by ${user.name}`
        });
        res.status(201).json({
            success: true,
            data: courseContent
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.replyCourseQuestionController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h;
    try {
        const { reply, course_id, content_id, question_id } = req.body;
        const course = yield course_model_1.default.findById(course_id);
        if (!mongoose_1.default.Types.ObjectId.isValid(content_id)) {
            return next(new ErrorHandler_1.default("Content id is not valid", 400));
        }
        // / search courseData with spesific id that want to reply
        const courseContent = course === null || course === void 0 ? void 0 : course.courseData.find((courseData) => courseData._id.equals(content_id));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Content id is not valid", 400));
        }
        // search question with spesific id that want to reply
        const question = courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions.find((question) => question._id.equals(question_id));
        if (!question) {
            return next(new ErrorHandler_1.default("Question id is not valid", 400));
        }
        // create quetion object
        const replyQuestion = {
            user: req.user,
            reply,
        };
        // Add reply to question
        (_d = question.questionReplies) === null || _d === void 0 ? void 0 : _d.push(replyQuestion);
        yield (course === null || course === void 0 ? void 0 : course.save());
        if (((_e = req.user) === null || _e === void 0 ? void 0 : _e._id) === ((_f = question.user) === null || _f === void 0 ? void 0 : _f._id)) {
            // if the user login === questions owner, send notification
            yield notification_model_1.default.create({
                userId: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id,
                title: "New Question Reply Received",
                message: `New Question reply was received. The Video : ${courseContent.title} have one question reply by ${(_h = req.user) === null || _h === void 0 ? void 0 : _h.name}`
            });
        }
        else {
            // Send Email to notify questions owner that the question has beed reply
            const data = {
                name: question.user.name,
                title: courseContent.title,
            };
            const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                yield (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data
                });
            }
            catch (error) {
                return next(new ErrorHandler_1.default(error.message, 400));
            }
        }
        res.status(201).json({
            success: true,
            data: course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.addReviewController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const userCourseList = (_j = req.user) === null || _j === void 0 ? void 0 : _j.courses;
        const courseId = req.params.courseId;
        // check if courseId already exist in userCourseList based on _id
        const courseExist = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.some((item) => item._id.toString() === courseId.toString());
        if (!courseExist) {
            return next(new ErrorHandler_1.default("Cant access this course", 400));
        }
        const course = yield course_model_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewObject = {
            user: req.user,
            review,
            rating
        };
        course === null || course === void 0 ? void 0 : course.reviews.push(reviewObject);
        // Calculate Rating
        let avgRating = 0;
        course === null || course === void 0 ? void 0 : course.reviews.forEach((item) => {
            avgRating += item.rating;
        });
        if (course) {
            course.ratings = avgRating / (course === null || course === void 0 ? void 0 : course.reviews.length);
        }
        yield (course === null || course === void 0 ? void 0 : course.save());
        // Send Notification to course owner
        const notification = {
            title: "New Review Received",
            message: `${(_k = req.user) === null || _k === void 0 ? void 0 : _k.name} has given a review on your course in ${course === null || course === void 0 ? void 0 : course.name}`
        };
        // create notification [LATER]
        res.status(201).json({
            success: true,
            data: course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.addReplyToReviewController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    try {
        const { comment, course_id, review_id } = req.body;
        const course = yield course_model_1.default.findById(course_id);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 400));
        }
        const review = course.reviews.find((item) => item._id.toString() === review_id);
        if (!review) {
            return next(new ErrorHandler_1.default("Review not found", 400));
        }
        const replyToReview = {
            user: req.user,
            comment
        };
        (_l = review.reviewReplies) === null || _l === void 0 ? void 0 : _l.push(replyToReview);
        yield course.save();
        res.status(201).json({
            success: true,
            data: course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET ALL COURSES --- Only Admin
exports.getAllCoursesController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, course_services_1.getAllCoursesServices)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// DELETE COURSE --- Only Admin
exports.deleteCourseController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.courseId;
        const course = yield course_model_1.default.findById(id);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found!", 400));
        }
        yield course.deleteOne({ _id: id });
        yield redis_1.redis.del(id);
        res.status(201).json({
            success: true,
            message: "Course Deleted Successfully",
            data: []
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// export const editCourseController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })
