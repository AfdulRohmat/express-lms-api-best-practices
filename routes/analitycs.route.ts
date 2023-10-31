import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { getCoursesAnalitycsController, getOrdersAnalitycsController, getUsesrAnalitycsController } from '../controller/analitycs.controller';
const analitycsRouter = express.Router()

analitycsRouter.get('/users-analytics', isAuthenticated, authorizeRole("admin"), getUsesrAnalitycsController)
analitycsRouter.get('/courses-analytics', isAuthenticated, authorizeRole("admin"), getCoursesAnalitycsController)
analitycsRouter.get('/orders-analytics', isAuthenticated, authorizeRole("admin"), getOrdersAnalitycsController)

export default analitycsRouter;