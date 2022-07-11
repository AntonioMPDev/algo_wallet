import User from "../models/User"

// check if email already exist
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const username = await User.findOne({ username: req.body.username })

    if(username) return res.status(400).json({ message: "The user already exists" })

    const email = await User.findOne({ email: req.body.email })

    if(email) return res.status(400).json({ message: "The email already exists" })

    next()
}