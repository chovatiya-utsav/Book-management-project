import { Review } from "../models/review.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createReview = asyncHandler(async (req, res) => {
    const { bookId, rating, comment } = req.body
    const userId = req.user.id

    if (!bookId) {
        throw new ApiError(400, "Book id is required.")
    }

    if (!rating && !comment) {
        throw new ApiError(400, "At least a rating or comment is required.")
    }

    const existingReview = await Review.findOne({ book: bookId, "review.user": userId })

    if (existingReview) {
        const updatedReview = await Review.findOneAndUpdate(
            { bookId, userId },
            {
                $set: {
                    "review.$.rating": rating,
                    "review.$.comment": comment
                }
            },
            { new: true }
        )

        return res.status(200).json(new ApiResponse(200, updatedReview, "Review update successfully"))
    }

    const review = await Review.findOneAndUpdate(
        { book: bookId },
        {
            $push: {
                review: {
                    user: userId,
                    rating,
                    comment
                },
            },
        },
        { new: true, upsert: true }// upsert:If no document exists for bookId, it creates a new one.
    )

    return res.status(201)
        .json(new ApiResponse(201, review, "Review added successfully"))
})

const getReviews = asyncHandler(async (req, res) => {
    const { bookId } = req.params

    if (!bookId) {
        throw new ApiError(400, "BookId is required")
    }

    const reviews = await Review.findOne({ book: bookId }).populate("review.user", "name email")

    if (!reviews || reviews.review.length === 0) {
        throw new ApiError(404, "No reviews found for this book")
    }

    return res.status(200)
        .json(new ApiResponse(200, reviews, "Reviews retrieved successfully"))
})

export { createReview, getReviews }