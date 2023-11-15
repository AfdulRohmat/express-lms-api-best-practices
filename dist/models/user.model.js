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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter valid email"
        },
        unique: true
    },
    password: {
        type: String,
        minLength: [6, "Min. 6 character"],
        select: false
        // required: [true, "Please enter your password"],
        // usually password remarkable as required, 
        //but because we have option to register with social media, 
        //then the password is not required anymore
    },
    avatar: {
        publicId: String,
        url: String
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: String,
        default: false
    },
    courses: [
        {
            courseId: String,
        }
    ]
}, { timestamps: true });
// Hash password 
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
// Sign Access Token function that can be use after model already inisialization
userSchema.methods.SignAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', { expiresIn: "5m" });
};
// Sign Refresh Token function that can be use after model already inisialization
userSchema.methods.SignRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', { expiresIn: "1d" });
};
// Compare password function that can be use after model already inisialization
userSchema.methods.comparePassword = function (hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(hashedPassword, this.password);
    });
};
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
