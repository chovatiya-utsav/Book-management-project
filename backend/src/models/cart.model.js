import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartSchema)