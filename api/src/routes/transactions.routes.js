import {Router} from "express"
import { makeTransaction, getTransactions } from "../controller/transactions.controller"
import { verifyToken } from "../middlewares"
import { addressChecking } from "../middlewares/addressChecking"

const router = Router()

// to get transactions of specified user
router.get('/user/:id',verifyToken,  getTransactions)

// to post a new transaction 
router.post('/',[verifyToken, addressChecking],  makeTransaction)

export default router