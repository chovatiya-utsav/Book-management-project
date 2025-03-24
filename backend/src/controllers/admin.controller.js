import { asyncHandler } from "../utils/asyncHandler.js";
//import { ApiError } from "../utils/ApiError";
import { Book } from "../models/book.model.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getBookCount = asyncHandler(async (req, res) => {

    const bookCount = await Book.countDocuments()

    if (bookCount === 0) {
        return res.status(404).json({ message: "No book found" })
    }

    return res.status(200)
        .json(new ApiResponse(200, { bookCount }))
})

const getUserCount = asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments()

    if (userCount === 0) {
        return res.status(404).json({ message: "No user found" })
    }

    return res.status(200).json(new ApiResponse(200, { userCount }))
})

export { getBookCount, getUserCount }