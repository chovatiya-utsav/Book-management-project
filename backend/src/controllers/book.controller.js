import { Book } from "../models/book.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createBook = asyncHandler(async (req, res) => {

    //get all book details from frontend
    const { bookName, author, publishedYear, genre, description, price, user } = req.body

    //console.log(req.user);


    if (
        [bookName, author, publishedYear, genre, description, price, user].some((field) => (field?.trim() === ""))
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //check for book already exist
    const existingBook = await Book.findOne({ bookName })

    if (existingBook) {
        throw new ApiError(409, "Book already exists")
    }

    //check for book cover image

    if (!req.file) {
        throw new ApiError(400, "Book Cover image is required")
    }

    const coverImageLocalPath = req.file.path//uploaded on file path

    //upload on cloudinary
    const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath)
    //console.log("Cloudinary Upload Response:", coverImage);
    if (!coverImageUrl) {
        throw new ApiError(500, "Error uploading cover image");
    }

    //create book object, entry in db
    const newBook = await Book.create({
        bookName,
        author,
        publishedYear,
        genre,
        description,
        price,
        coverImage: coverImageUrl?.url || "",
        user: req.user._id
    })
    //console.log(newBook);


    return res.status(201)
        .json(new ApiResponse(201, newBook, "Book added successfully"))
})

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().populate("user", "name email")

    res.status(200)
        .json(new ApiResponse(200, books, "Books fetched successfully"))
})

const getBookById = asyncHandler(async (req, res) => {

    const { id } = req.params
    const book = await Book.findById(id).populate("user", "name email")

    if (!book) {
        throw new ApiError(404, "Book not found")
    }

    res.status(200)
        .json(new ApiResponse(200, book, "Book detail fetched successfuly"))
})

const updateBook = asyncHandler(async (req, res) => {
    const { bookName, author, publishedYear, genre, description, price } = req.body
    const { id } = req.params

    const coverImageLocalPath = req.file?.path

    if (!bookName || !author || !publishedYear || !genre || !description || !price) {
        throw new ApiError(400, "All fields are required")
    }

    const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImageUrl.url) {
        throw new ApiError(400, "Error while uploading image on cloudinary")
    }

    const updatedBook = await Book.findByIdAndUpdate(
        id,
        {
            $set: {
                bookName,
                author, publishedYear,
                genre,
                description,
                price,
                coverImage: coverImageUrl.url
            },
        },
        {
            new: true
        }
    )

    if (!updatedBook) {
        throw new ApiError(404, "Book not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedBook, "Book update successfully"))
})

const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
        throw new ApiError(404, "Book not found or already exist")
    }

    res.status(200)
        .json(new ApiResponse(200, {}, "Book deleted successfully"))
})

export {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}