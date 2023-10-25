import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { createOrderController } from '../controller/order.controller'
const orderRouter = express.Router()

orderRouter.post('/create-order', isAuthenticated, createOrderController)

export default orderRouter;