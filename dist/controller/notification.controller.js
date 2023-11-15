"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationStatusController = exports.getAllNotificationController = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const notification_model_1 = __importDefault(require("../models/notification.model"));
const node_cron_1 = __importDefault(require("node-cron"));
// GET ALL NOTIFICATION -- Only Admin
exports.getAllNotificationController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // sort/urutkan semua data dari scr descending (dari bawah) karena data terbaru berada pada urutan terakhir
        const notification = yield notification_model_1.default.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            data: notification
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE NOTIFICATION STATUS
exports.updateNotificationStatusController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationId = req.params.notificationId;
        const notification = yield notification_model_1.default.findById(notificationId);
        if (!notification) {
            return next(new ErrorHandler_1.default("Notification not found", 400));
        }
        notification.status ? notification.status = 'read' : notification.status;
        yield notification.save();
        const allNotifications = yield notification_model_1.default.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            message: "Success update status",
            data: allNotifications
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// AUTO DELETE DELETE NOTIFICATION AFTER A MONTH WITH CRON JOB (TASK SCHEDULER) -- ADMIN ONLY
node_cron_1.default.schedule("0 0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const thrtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    yield notification_model_1.default.deleteMany({
        status: "read",
        createdAt: {
            $lt: thrtyDayAgo
        }
    });
    console.log('Deteled read notification');
}));
// export const editCourseController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })
