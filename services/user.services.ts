import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import UserModel from "../models/user.model";

// GET USER BY ID
export const getUserByIdServices = async (id: string, res: Response) => {
    const userJson = await redis.get(id)

    if (userJson) {
        const user = JSON.parse(userJson)
        res.status(200).json({
            success: true,
            data: user
        })
    }
}

// GET ALL USERS
export const getAllUserServices = async (res: Response) => {
    const users = await UserModel.find().sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        data: users
    })
}

// UOPDATE USER ROLE
export const updateUserRoleServices = async (res: Response, user_id: string, role: string) => {
    const user = await UserModel.findByIdAndUpdate(user_id, {
        role
    }, { new: true })


    res.status(200).json({
        success: true,
        data: user
    })
}



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