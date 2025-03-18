import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
app.use(cors())
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || origin.startsWith("http://localhost")) {
//             callback(null, true); // Allow requests from any localhost domain
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true, // Allow cookies & authentication headers
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.routes.js"
import bookRouter from "./routes/book.router.js"
import categoryRouter from "./routes/category.router.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/books", bookRouter)
app.use("/api/v1/category", categoryRouter)


export { app }