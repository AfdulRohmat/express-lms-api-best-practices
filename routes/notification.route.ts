import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { getAllNotificationController, updateNotificationStatusController } from '../controller/notification.controller';

const notificationRouter = express.Router()

notificationRouter.get('/notifications', isAuthenticated, authorizeRole('admin'), getAllNotificationController)
notificationRouter.put('/notification-status/:notificationId', isAuthenticated, authorizeRole('admin'), updateNotificationStatusController)

export default notificationRouter;