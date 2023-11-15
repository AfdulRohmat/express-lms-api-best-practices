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
exports.errorMiddleware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const errorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    // wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // Duplicate key error
    if (err === 11000) {
        const message = `Diplicate ${Object.keys(err.keyValue)}`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `JWT is invalid`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // JWT Expired error
    if (err.name === 'TokenExpiredError') {
        const message = `JWT is expired, try again`;
        err = new ErrorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
});
exports.errorMiddleware = errorMiddleware;
