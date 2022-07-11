import User from "../models/User";
import jwt from "jsonwebtoken"
import config from "../config";

// signup user
export const signup = async (req, res) => {

    const { username, email, password } = req.body

    const newUser = User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    
    const savedUser = await newUser.save()

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 h
    })

    res.status(200).json({newUser})
}

// login user
export const signin = async (req, res) => {
    const { email, password } = req.body 

    const userFound = await User.findOne({email: email})

    if(!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({ token: null, message: "Invalid Passsword" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400 // 24 h
    })

    res.json({ token })
}

// get current user authenticated
export const getMe = async (req, res) => {
    const authorizationHeader = req.headers.authorization.split(" ")
    const decoded = jwt.decode(authorizationHeader[1], config.SECRET)

    const user = await User.findById(decoded.id)

    user.password = undefined

    res.json(user)
}