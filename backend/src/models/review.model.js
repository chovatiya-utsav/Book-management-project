import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    review: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

export const Review = mongoose.model("Review", reviewSchema)