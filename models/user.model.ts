import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // email validation

export interface UserInterface extends Document {
    name: string,
    email: string,
    password: string,
    avatar: {
        publicId: string,
        url: string
    },
    role: string,
    isVerified: Boolean,
    courses: Array<{ CourseInterface: string }>,
    comparePassword: (password: string) => Promise<boolean>,
    SignAccessToken: () => string,
    SignRefreshToken: () => string,
}

const userSchema: Schema<UserInterface> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value)
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
}, { timestamps: true })

// Hash password 
userSchema.pre<UserInterface>('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Sign Access Token function that can be use after model already inisialization
userSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', { expiresIn: "5m" })
}

// Sign Refresh Token function that can be use after model already inisialization
userSchema.methods.SignRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', { expiresIn: "1d" })
}

// Compare password function that can be use after model already inisialization
userSchema.methods.comparePassword = async function (hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(hashedPassword, this.password)
}

const UserModel: Model<UserInterface> = mongoose.model("User", userSchema)
export default UserModel
