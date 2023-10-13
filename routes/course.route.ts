import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { editCourseController, getAllCoursesWithoutPurchasingController, getSingleCourseWithoutPurchasingController, uploadCourseController } from '../controller/course.controller'
const courseRouter = express.Router()

courseRouter.post('/create-course', isAuthenticated, authorizeRole("admin"), uploadCourseController)
courseRouter.put('/edit-course/:id', isAuthenticated, authorizeRole("admin"), editCourseController)
courseRouter.get('/get-course/:id', getSingleCourseWithoutPurchasingController)
courseRouter.get('/get-courses', getAllCoursesWithoutPurchasingController)

export default courseRouter;