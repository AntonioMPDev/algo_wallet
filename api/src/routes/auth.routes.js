import { Router } from "express"
import { signin, signup, getMe } from "../controller/auth.controller"
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignup"
import { verifyToken } from "../middlewares"

const router = Router()

// handle signup
router.post('/signup', [checkDuplicateUsernameOrEmail] , signup)

// handle login
router.post('/signin', signin)

// get current user
router.get('/me', verifyToken,  getMe)

export default router