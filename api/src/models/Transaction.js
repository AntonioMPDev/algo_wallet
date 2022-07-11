import { Schema, model, Types } from "mongoose";

const TransactioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    txId: String,
    amount: String
}, {
    timestamps: true,
    versionKey: false
})


export default model('Transaction', TransactioSchema)
