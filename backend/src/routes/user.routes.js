import { Router } from "express";
import { checkUser, forgotPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { registrationValidation, loginValidation } from "../middlewares/validation.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route('/register').post(registrationValidation, registerUser)

router.route('/login').post(loginValidation, loginUser)

//secured routes
router.route('/logout').post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/current-user").post(verifyJWT, getCurrentUser)

router.route("/check-user").post(checkUser)

router.route("/forgotpassword").post( forgotPassword)

export default router
