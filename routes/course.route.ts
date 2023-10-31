import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { addQuestionController, addReplyToReviewController, addReviewController, deleteCourseController, editCourseController, getAllCoursesController, getAllCoursesWithoutPurchasingController, getCourseByUserController, getSingleCourseWithoutPurchasingController, replyCourseQuestionController, uploadCourseController } from '../controller/course.controller'
const courseRouter = express.Router()

courseRouter.post('/course', isAuthenticated, authorizeRole("admin"), uploadCourseController)
courseRouter.put('/course/:id', isAuthenticated, authorizeRole("admin"), editCourseController)
courseRouter.get('/course/:id', getSingleCourseWithoutPurchasingController)
courseRouter.get('/courses/all', getAllCoursesWithoutPurchasingController)
courseRouter.get('/course-content/:courseId', isAuthenticated, getCourseByUserController)
courseRouter.put('/question', isAuthenticated, addQuestionController)
courseRouter.put('/reply-question', isAuthenticated, replyCourseQuestionController)
courseRouter.put('/review/:courseId', isAuthenticated, addReviewController)
courseRouter.put('/reply-review', isAuthenticated, authorizeRole("admin"), addReplyToReviewController)
courseRouter.get('/courses', isAuthenticated, authorizeRole("admin"), getAllCoursesController)
courseRouter.delete('/course/:courseId', isAuthenticated, authorizeRole("admin"), deleteCourseController)

export default courseRouter;