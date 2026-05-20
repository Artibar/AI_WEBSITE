import express from 'express'
import { googleAuth, signup, login, logout, currentUser } from '../controller/authController.js';
import protectRoute from '../middleware/protectRoute.js'


const authRouter = express.Router()

authRouter.post('/google', googleAuth)
authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.get('/currentUser', protectRoute, currentUser)

export default authRouter;