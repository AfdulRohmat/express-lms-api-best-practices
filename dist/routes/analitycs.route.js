"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const analitycs_controller_1 = require("../controller/analitycs.controller");
const analitycsRouter = express_1.default.Router();
analitycsRouter.get('/users-analytics', auth_1.isAuthenticated, (0, auth_1.authorizeRole)("admin"), analitycs_controller_1.getUsesrAnalitycsController);
analitycsRouter.get('/courses-analytics', auth_1.isAuthenticated, (0, auth_1.authorizeRole)("admin"), analitycs_controller_1.getCoursesAnalitycsController);
analitycsRouter.get('/orders-analytics', auth_1.isAuthenticated, (0, auth_1.authorizeRole)("admin"), analitycs_controller_1.getOrdersAnalitycsController);
exports.default = analitycsRouter;
