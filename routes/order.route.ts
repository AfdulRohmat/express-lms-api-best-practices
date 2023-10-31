import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { createOrderController, getAllOrdersController } from '../controller/order.controller'
const orderRouter = express.Router()

orderRouter.post('/order', isAuthenticated, createOrderController)
orderRouter.get('/orders', isAuthenticated, authorizeRole("admin"), getAllOrdersController)

export default orderRouter;