import express from 'express'
import { activationUserController, getUserByIdController, loginUserController, logoutUserController, registerUserController, socialAuthController, updateAccessTokenController, updateProfilePictureController, updateUserController, updateUserPasswordController } from '../controller/user.controller'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
const userRouter = express.Router()

userRouter.post('/registration', registerUserController)
userRouter.post('/activate-user', activationUserController)
userRouter.post('/social-auth', socialAuthController)
userRouter.post('/login', loginUserController)
userRouter.get('/logout', isAuthenticated, logoutUserController)
userRouter.get('/refresh-token', updateAccessTokenController)

userRouter.get('/user-info', isAuthenticated, getUserByIdController)
userRouter.put('/update-user-info', isAuthenticated, updateUserController)
userRouter.put('/update-password', isAuthenticated, updateUserPasswordController)
userRouter.put('/update-user-avatar', isAuthenticated, updateProfilePictureController)

export default userRouter;