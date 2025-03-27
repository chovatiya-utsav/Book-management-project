import { Cart } from "../models/cart.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const addToCart = asyncHandler(async (req, res) => {
    const { bookId, quantity } = req.body

    if (!bookId || !quantity) {
        throw new ApiError(400, "Book ID and quantity are required")
    }

    // Check if book is already in the cart
    const existingCartItem = await Cart.findOne({ book: bookId })

    if (existingCartItem) {
        //update quantity if book already exist
        existingCartItem.quantity += quantity
        await existingCartItem.save()
        return res.status(200).json(new ApiResponse(200, existingCartItem, "Cart updated successfully"))
    }

    //add new item in cart
    const cartItem = await Cart.create({ book: bookId, quantity })

    res.status(201).json(new ApiResponse(201, cartItem, "Book added to cart successfully"))
})

const getCartItem = asyncHandler(async (req, res) => {
    const cartItems = await Cart.find().populate("book", "bookName price coverImage")

    if (cartItems.length === 0) {
        throw new ApiError(404, "Cart is Empty")
    }

    res.status(200).json(new ApiResponse(200, cartItems, "Cart retrieved successfully"))
})

const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { cartId } = req.params
    const { quantity } = req.body

    if (!quantity) {
        throw new ApiError(400, "Quantity is required.")
    }

    const cartItem = await Cart.findByIdAndUpdate(
        cartId,
        { quantity },
        { new: true }
    )

    if (!cartItem) {
        throw new ApiError(404, "Cart item not found.")
    }

    res.status(200).json(new ApiResponse(200, cartItem, "Cart item update successfully."))
})

const removeCartItem = asyncHandler(async (req, res) => {
    const { cartId } = req.params

    const cartItem = await Cart.findByIdAndDelete(cartId)

    if (!cartItem) {
        throw new ApiError(404, "Cart item not found")
    }

    res.status(200).json(new ApiResponse(200, null, "Cart item delete successfully"))
})
export { addToCart, getCartItem, updateCartItemQuantity,removeCartItem }

