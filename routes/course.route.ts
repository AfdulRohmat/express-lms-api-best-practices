import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { addQuestionController, addReplyToReviewController, addReviewController, editCourseController, getAllCoursesWithoutPurchasingController, getCourseByUserController, getSingleCourseWithoutPurchasingController, replyCourseQuestionController, uploadCourseController } from '../controller/course.controller'
const courseRouter = express.Router()

courseRouter.post('/create-course', isAuthenticated, authorizeRole("admin"), uploadCourseController)
courseRouter.put('/edit-course/:id', isAuthenticated, authorizeRole("admin"), editCourseController)
courseRouter.get('/get-course/:id', getSingleCourseWithoutPurchasingController)
courseRouter.get('/get-courses', getAllCoursesWithoutPurchasingController)
courseRouter.get('/get-course-content/:courseId', isAuthenticated, getCourseByUserController)
courseRouter.put('/add-question', isAuthenticated, addQuestionController)
courseRouter.put('/reply-question', isAuthenticated, replyCourseQuestionController)
courseRouter.put('/add-review/:courseId', isAuthenticated, addReviewController)
courseRouter.put('/add-reply-review', isAuthenticated, authorizeRole("admin"), addReplyToReviewController)

export default courseRouter;