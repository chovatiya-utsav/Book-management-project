// import { asyncHandler } from "../utils/asyncHandler.js";
// import { Admin } from "../models/admin.model.js";
// import { ApiError } from "../utils/ApiError";

// const registerAdmin = asyncHandler(async (req, res) => {

//     const { name, email, password, contactNo, address } = req.body

//     if (
//         [name, email, password, contactNo, address].some((field) => field?.trim() === "")
//     ) {
//         throw new ApiError(400, "All fields are required")
//     }

//     const existedAdmin = await Admin.findOne()
// })