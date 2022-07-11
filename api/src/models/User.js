import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"

// user model
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

// encrypt password
UserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// check password
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}



export default model('User', UserSchema)
