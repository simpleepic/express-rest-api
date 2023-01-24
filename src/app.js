const express = require("express")

const AppError = require("./utils/error/appError")
const globalErrorHandler = require("./utils/error/globalErrorHandler")

// Routes
const postRouter = require("./routes/postRoutes")

const app = express()

app.use(express.json())


app.use("/api/v1/post", postRouter)

// Error Handling : Handling unhandled routes
app.all("*", (req, res, next) => {
    const error = new AppError("Route is not defined", 404)

    next(error)
})

app.use(globalErrorHandler)

module.exports = app