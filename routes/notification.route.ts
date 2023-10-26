import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { getAllNotificationController, updateNotificationStatusController } from '../controller/notification.controller';

const notificationRouter = express.Router()

notificationRouter.get('/get-all-notifications', isAuthenticated, authorizeRole('admin'), getAllNotificationController)
notificationRouter.put('/update-notification-status/:notificationId', isAuthenticated, authorizeRole('admin'), updateNotificationStatusController)

export default notificationRouter;