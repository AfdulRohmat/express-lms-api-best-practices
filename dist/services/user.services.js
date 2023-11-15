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
exports.updateUserRoleServices = exports.getAllUserServices = exports.getUserByIdServices = void 0;
const redis_1 = require("../utils/redis");
const user_model_1 = __importDefault(require("../models/user.model"));
// GET USER BY ID
const getUserByIdServices = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userJson = yield redis_1.redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).json({
            success: true,
            data: user
        });
    }
});
exports.getUserByIdServices = getUserByIdServices;
// GET ALL USERS
const getAllUserServices = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: users
    });
});
exports.getAllUserServices = getAllUserServices;
// UOPDATE USER ROLE
const updateUserRoleServices = (res, user_id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(user_id, {
        role
    }, { new: true });
    res.status(200).json({
        success: true,
        data: user
    });
});
exports.updateUserRoleServices = updateUserRoleServices;
// export const getUserById = async (res: Response) => {
//     const userJson = await redis.get(id)
//     if (userJson) {
//         const user = JSON.parse(userJson)
//         res.status(200).json({
//             success: true,
//             data: user
//         })
//     }
// }
