"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const order_controller_1 = require("../controller/order.controller");
const orderRouter = express_1.default.Router();
orderRouter.post('/order', auth_1.isAuthenticated, order_controller_1.createOrderController);
orderRouter.get('/orders', auth_1.isAuthenticated, (0, auth_1.authorizeRole)("admin"), order_controller_1.getAllOrdersController);
exports.default = orderRouter;
