import { core } from '@algonaut/algo-validation-agent/dist/algo-validation-agent.cjs';


export const addressChecking = async (req, res, next) => {
    const {receiverAddr} = req.body

    const isValid = await core.isAlgorandAddress(receiverAddr)

    if(isValid){
        next()
    } else {
        return res.status(409).json({ message: "Invalid address" })
    }
}