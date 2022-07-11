import { Router } from "express"
import { signin, signup, getMe } from "../controller/auth.controller"
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignup"
import { verifyToken } from "../middlewares"

const router = Router()

router.post('/signup', [checkDuplicateUsernameOrEmail] , signup)

router.post('/signin', signin)

router.get('/me', verifyToken,  getMe)

export default router