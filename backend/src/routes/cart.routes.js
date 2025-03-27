import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { addToCart, getCartItem, removeCartItem, updateCartItemQuantity } from "../controllers/cart.controller.js"

const router = Router()

router.route('/addToCart').post(verifyJWT, addToCart)

router.route('/getCartItem').get(verifyJWT, getCartItem)

router.route('/:cartId').put(updateCartItemQuantity)

router.route('/:cartId').delete(removeCartItem)
export default router

