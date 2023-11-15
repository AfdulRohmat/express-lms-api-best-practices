"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const notification_controller_1 = require("../controller/notification.controller");
const notificationRouter = express_1.default.Router();
notificationRouter.get('/notifications', auth_1.isAuthenticated, (0, auth_1.authorizeRole)('admin'), notification_controller_1.getAllNotificationController);
notificationRouter.put('/notification-status/:notificationId', auth_1.isAuthenticated, (0, auth_1.authorizeRole)('admin'), notification_controller_1.updateNotificationStatusController);
exports.default = notificationRouter;
