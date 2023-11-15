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
exports.getAllOrdersController = exports.createOrderController = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const order_services_1 = require("../services/order.services");
const redis_1 = require("../utils/redis");
exports.createOrderController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { course_id, payment_info } = req.body;
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 400));
        }
        // Check course if already pruchased
        const courseAlreadyPurchased = user.courses.some((course) => course._id.toString() === course_id);
        if (courseAlreadyPurchased) {
            return next(new ErrorHandler_1.default("User already purchase this courses", 400));
        }
        const course = yield course_model_1.default.findById(course_id);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 400));
        }
        const orderData = {
            courseId: course._id,
            userId: user === null || user === void 0 ? void 0 : user._id,
            paymentInfo: ''
        };
        // Send Confirmation Email After Order
        const mailData = {
            order: {
                _id: course._id,
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) // Indonesia
            }
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData });
        try {
            if (user) {
                yield (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData
                });
            }
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
        // Add Course Id to User Courses Array after purchased
        user === null || user === void 0 ? void 0 : user.courses.push(course === null || course === void 0 ? void 0 : course._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        // Send Notification order to Admin 
        yield notification_model_1.default.create({
            userId: user._id,
            title: "New Order",
            message: `New Order Confirmed. The Course : ${course.name} has been ordered`
        });
        // Update Purchased value on Course
        course.purchased ? course.purchased += 1 : course.purchased;
        yield course.save();
        // Update Redis
        yield redis_1.redis.set(user === null || user === void 0 ? void 0 : user._id, JSON.stringify(user));
        // Create Order
        (0, order_services_1.createOrderService)(orderData, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET ALL ORDERS --- Only Admin
exports.getAllOrdersController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, order_services_1.getAllOrderServices)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// export const activationUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })
