import express from 'express'
import { activationUserController, deleteUserController, getAllUsersController, getUserByIdController, loginUserController, logoutUserController, registerUserController, socialAuthController, updateAccessTokenController, updateProfilePictureController, updateUserController, updateUserPasswordController, updateUserRoleController } from '../controller/user.controller'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
const userRouter = express.Router()

userRouter.post('/register', registerUserController)
userRouter.post('/activate-user', activationUserController)
userRouter.post('/social-auth', socialAuthController)
userRouter.post('/login', loginUserController)
userRouter.get('/logout', isAuthenticated, logoutUserController)
userRouter.get('/refresh-token', updateAccessTokenController)

userRouter.get('/user-info', isAuthenticated, getUserByIdController)
userRouter.put('/user-info', isAuthenticated, updateUserController)
userRouter.put('/password', isAuthenticated, updateUserPasswordController)

userRouter.put('/user-avatar', isAuthenticated, updateProfilePictureController)
userRouter.get('/users', isAuthenticated, authorizeRole("admin"), getAllUsersController)
userRouter.put('/user-role', isAuthenticated, authorizeRole("admin"), updateUserRoleController)
userRouter.delete('/user/:userId', isAuthenticated, authorizeRole("admin"), deleteUserController)

export default userRouter;