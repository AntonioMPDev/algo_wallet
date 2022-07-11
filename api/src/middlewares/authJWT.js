import jwt from "jsonwebtoken"
import config from "../config"
import User from "../models/User"

export const verifyToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization.split(" ")

        if(authorizationHeader[0] !== "Bearer") return res.status(403).json({message: "No token provided"})
    
        const decoded = jwt.verify(authorizationHeader[1], config.SECRET)
       
        req.userId = decoded.id
    
        const user = await User.findById(req.userId, {password:0})
        if(!user) return res.status(404).json({ message: "no user found" })
    
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}