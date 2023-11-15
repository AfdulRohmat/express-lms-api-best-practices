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
exports.deleteUserController = exports.updateUserRoleController = exports.getAllUsersController = exports.updateProfilePictureController = exports.updateUserPasswordController = exports.updateUserController = exports.socialAuthController = exports.getUserByIdController = exports.updateAccessTokenController = exports.logoutUserController = exports.loginUserController = exports.activationUserController = exports.createActivationToken = exports.registerUserController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const jwt_1 = require("../utils/jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("../utils/redis");
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_services_1 = require("../services/user.services");
dotenv_1.default.config();
exports.registerUserController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = yield user_model_1.default.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler_1.default("Email already registered", 400));
        }
        const user = {
            name, email, password
        };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        // SEND ACTIVATION CODE TO EMAIL
        const data = { user: { name: user.name }, activationCode };
        try {
            yield (0, sendMail_1.default)({
                email: user.email,
                subject: "Activate your account",
                template: "activation-mail.ejs",
                data
            });
            res.status(200).json({
                success: true,
                message: `Please check yout email at ${user.email} to activate yout account`,
                activation_token: activationToken.token
            });
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({ user, activationCode }, process.env.ACTIVATION_JWT_SECRET, { expiresIn: '15m' });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.activationUserController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_JWT_SECRET);
        if (newUser.activationCode != activation_code) {
            return next(new ErrorHandler_1.default("Invalid activation code", 400));
        }
        const { name, email, password } = newUser.user;
        const existUser = yield user_model_1.default.findOne({ email });
        if (existUser) {
            return next(new ErrorHandler_1.default("Email already exist, please login", 400));
        }
        yield user_model_1.default.create({
            name,
            email,
            password
        });
        res.status(201).json({
            success: true,
            message: "User succesfully activated. Please login then"
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.loginUserController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler_1.default("Please enter email and password", 400));
        }
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler_1.default("Invalid email or password", 400));
        }
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default("Invalid email or password", 400));
        }
        // Send Token and Return the callback response
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// LOGOUT USER
exports.logoutUserController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || '';
        redis_1.redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE ACCESS TOKEN
exports.updateAccessTokenController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token;
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
        if (!decoded) {
            return next(new ErrorHandler_1.default('Could not refresh token', 400));
        }
        const session = yield redis_1.redis.get(decoded.id);
        if (!session) {
            return next(new ErrorHandler_1.default('Please Login First', 400));
        }
        const user = JSON.parse(session);
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "5m"
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
            expiresIn: "1d"
        });
        req.user = user;
        res.cookie("access_token", accessToken, jwt_1.accessTokenOptions);
        res.cookie("refresh_token", refreshToken, jwt_1.refreshTokenOptions);
        // Update redis caching and set timer
        yield redis_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7 days converting to second
        res.status(200).json({
            success: true,
            access_token: accessToken
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET USER INFO
exports.getUserByIdController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const user = yield user_model_1.default.findById(userId);
        // res.status(200).json({
        //     success: true,
        //     data: user
        // })
        (0, user_services_1.getUserByIdServices)(userId, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.socialAuthController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, avatar } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = yield user_model_1.default.create({ email, name, avatar });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateUserController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { email, name } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const user = yield user_model_1.default.findById(userId);
        if (email && user) {
            const isEmailExist = yield user_model_1.default.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler_1.default("Email already exist", 400));
            }
            // Update email if not exist before
            user.email = email;
        }
        // Update Name
        if (name && user) {
            user.name = name;
        }
        // Save user after data change
        user === null || user === void 0 ? void 0 : user.save;
        // Update data user on redis
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateUserPasswordController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { old_password, new_password } = req.body;
        if (!old_password || !new_password) {
            return next(new ErrorHandler_1.default("Please enter old and new password", 400));
        }
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        const user = yield user_model_1.default.findById(userId).select('+password');
        if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
            return next(new ErrorHandler_1.default("Invalid user", 400));
        }
        const isExistingPasswordMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(old_password));
        if (!isExistingPasswordMatch) {
            return next(new ErrorHandler_1.default('Invalid password !', 400));
        }
        user.password = new_password;
        yield user.save;
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            message: "Update Password Success",
            data: user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE PROFILE PICTURE
exports.updateProfilePictureController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { avatar } = req.body;
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
        const user = yield user_model_1.default.findById(userId);
        if (avatar && user) {
            // if user already have avatar
            if (user === null || user === void 0 ? void 0 : user.avatar.publicId) {
                // Delete old image
                yield cloudinary_1.default.v2.uploader.destroy(user.avatar.publicId);
                const cloudinaryUpload = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatar-profile-picture",
                    width: 150
                });
                user.avatar = {
                    publicId: cloudinaryUpload.public_id,
                    url: cloudinaryUpload.secure_url
                };
            }
            else {
                const cloudinaryUpload = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatar-profile-picture",
                    width: 150
                });
                user.avatar = {
                    publicId: cloudinaryUpload.public_id,
                    url: cloudinaryUpload.secure_url
                };
            }
        }
        user === null || user === void 0 ? void 0 : user.save;
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            message: "Update Avatar Success",
            data: user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET ALL USERS --- Only Admin
exports.getAllUsersController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, user_services_1.getAllUserServices)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE USER ROLE --- Only Admin
exports.updateUserRoleController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, role } = req.body;
        const user = yield user_model_1.default.findById(user_id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found!", 400));
        }
        (0, user_services_1.updateUserRoleServices)(res, user_id, role);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// DELETE USER --- Only Admin
exports.deleteUserController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found!", 400));
        }
        yield user.deleteOne({ _id: id });
        yield redis_1.redis.del(id);
        res.status(201).json({
            success: true,
            message: "User Deleted Successfully",
            data: []
        });
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
