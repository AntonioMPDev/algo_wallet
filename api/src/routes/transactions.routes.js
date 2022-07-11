import {Router} from "express"
import { makeTransaction, getTransactions } from "../controller/transactions.controller"
import { verifyToken } from "../middlewares"
import { addressChecking } from "../middlewares/addressChecking"

const router = Router()

router.get('/user/:id',verifyToken,  getTransactions)
router.post('/',[verifyToken, addressChecking],  makeTransaction)

export default router