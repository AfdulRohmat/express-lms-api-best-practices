import { Request, Response, NextFunction } from "express";
import UserModel, { UserInterface } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import ejs from 'ejs'
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import dotenv from 'dotenv';
import { redis } from "../utils/redis";
import cloudinary from 'cloudinary';


dotenv.config();

// REGISTER USER
interface RegisterUserBodyInterface {
    name: string,
    email: string,
    password: string,
    avatar?: string,
}

export const registerUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body

        const isEmailExist = await UserModel.findOne({ email })
        if (isEmailExist) {
            return next(new ErrorHandler("Email already registered", 400))
        }

        const user: RegisterUserBodyInterface = {
            name, email, password
        }

        const activationToken = createActivationToken(user)
        const activationCode = activationToken.activationCode

        // SEND ACTIVATION CODE TO EMAIL
        const data = { user: { name: user.name }, activationCode }
        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                template: "activation-mail.ejs",
                data
            })

            res.status(200).json({
                success: true,
                message: `Please check yout email at ${user.email} to activate yout account`,
                activation_token: activationToken.token
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GENERATE ACTIVATION TOKEN
interface ActivationTokenInterface {
    token: string,
    activationCode: string
}
export const createActivationToken = (user: any): ActivationTokenInterface => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_JWT_SECRET as Secret, { expiresIn: '15m' })

    return { token, activationCode }
}

// ACTIVATE USER
interface ActivationUserInterface {
    activation_token: string,
    activation_code: string
}
export const activationUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_token, activation_code } = req.body as ActivationUserInterface

        const newUser: { user: UserInterface, activationCode: string } = jwt.verify(
            activation_token, process.env.ACTIVATION_JWT_SECRET as string
        ) as { user: UserInterface, activationCode: string }

        if (newUser.activationCode != activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400))
        }

        const { name, email, password } = newUser.user;
        const existUser = await UserModel.findOne({ email })
        if (existUser) {
            return next(new ErrorHandler("Email already exist, please login", 400))
        }

        await UserModel.create({
            name,
            email,
            password
        })

        res.status(201).json({
            success: true,
            message: "User succesfully activated. Please login then"
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// LOGIN USER
interface LoginUserInterface {
    email: string,
    password: string
}
export const loginUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as LoginUserInterface

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400))
        }

        const user = await UserModel.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 400))
        }

        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 400))
        }

        // Send Token and Return the callback response
        sendToken(user, 200, res)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// LOGOUT USER
export const logoutUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 })
        res.cookie("refresh_token", "", { maxAge: 1 })

        const userId = req.user?._id || ''
        redis.del(userId)

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// UPDATE ACCESS TOKEN
export const updateAccessTokenController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token as string

        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload
        if (!decoded) {
            return next(new ErrorHandler('Could not refresh token', 400))
        }

        const session = await redis.get(decoded.id as string)
        if (!session) {
            return next(new ErrorHandler('Could not refresh token', 400))
        }

        const user = JSON.parse(session);

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
            expiresIn: "5m"
        })

        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
            expiresIn: "1d"
        })

        req.user = user;
        res.cookie("access_token", accessToken, accessTokenOptions)
        res.cookie("refresh_token", refreshToken, refreshTokenOptions)

        res.status(200).json({
            success: true,
            access_token: accessToken
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// GET USER INFO
export const getUserByIdController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        const userJSON = await redis.get(userId)
        const user = await UserModel.findById(userId)

        res.status(200).json({
            success: true,
            data: user
        })
        
        // if (userJSON) {
        //     const user = JSON.parse(userJSON)
        //     res.status(200).json({
        //         success: true,
        //         data: user
        //     })
        // }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})


// SOCIAL AUTH
interface SocialAuthInterface {
    email: string,
    name: string,
    avatar: string
}
export const socialAuthController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, avatar } = req.body as SocialAuthInterface

        const user = await UserModel.findOne({ email })

        if (!user) {
            const newUser = await UserModel.create({ email, name, avatar })
            sendToken(newUser, 200, res)
        } else {
            sendToken(user, 200, res)
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// UPDATE USER INFO
interface UpdateUserInterface {
    name?: string,
    email?: string
}
export const updateUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name } = req.body as UpdateUserInterface

        const userId = req.user?._id
        const user = await UserModel.findById(userId)
        if (email && user) {
            const isEmailExist = await UserModel.findOne({ email })
            if (isEmailExist) {
                return next(new ErrorHandler("Email already exist", 400))
            }

            // Update email if not exist before
            user.email = email
        }

        // Update Name
        if (name && user) {
            user.name = name
        }

        // Save user after data change
        user?.save

        // Update data user on redis
        await redis.set(userId, JSON.stringify(user))

        res.status(201).json({
            success: true,
            data: user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// UPDATE USER PASSWORD
interface UpdateUserPasswordInterface {
    old_password: string,
    new_password: string
}
export const updateUserPasswordController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { old_password, new_password } = req.body as UpdateUserPasswordInterface;

        if (!old_password || !new_password) {
            return next(new ErrorHandler("Please enter old and new password", 400))
        }

        const userId = req.user?._id
        const user = await UserModel.findById(userId).select('+password');

        if (user?.password === undefined) {
            return next(new ErrorHandler("Invalid user", 400))
        }

        const isExistingPasswordMatch = await user?.comparePassword(old_password);
        if (!isExistingPasswordMatch) {
            return next(new ErrorHandler('Invalid password !', 400))
        }

        user.password = new_password;

        await user.save;
        await redis.set(userId, JSON.stringify(user));

        res.status(201).json({
            success: true,
            message: "Update Password Success",
            data: user
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

interface UpdateProfilePictureInterface {
    avatar: string
}
// UPDATE PROFILE PICTURE
export const updateProfilePictureController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body
        const userId = req.user?._id
        const user = await UserModel.findById(userId)

        if (avatar && user) {
            // if user already have avatar
            if (user?.avatar.publicId) {
                // Delete old image
                await cloudinary.v2.uploader.destroy(user.avatar.publicId)

                const cloudinaryUpload = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatar-profile-picture",
                    width: 150
                });

                user.avatar = {
                    publicId: cloudinaryUpload.public_id,
                    url: cloudinaryUpload.secure_url
                }

            } else {
                const cloudinaryUpload = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatar-profile-picture",
                    width: 150
                });

                user.avatar = {
                    publicId: cloudinaryUpload.public_id,
                    url: cloudinaryUpload.secure_url
                }
            }
        }

        user?.save;
        await redis.set(userId, JSON.stringify(user));

        res.status(201).json({
            success: true,
            message: "Update Avatar Success",
            data: user
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// export const activationUserController = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })