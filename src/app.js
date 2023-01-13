const express = require("express");

const AppError = require("./utils/error/appError");
const globalErrorHandler = require("./utils/error/globalErrorHandler");

const authRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);

app.all("*", (req, res, next) => {
  // Before
  // res.status(404).json({
  //     status: "fail",
  //     message: "Route not found"
  // })

  // Passing to error handling middleware
  // const err = new Error("Route not found")
  // err.status = "fail"
  // err.statusCode = 404

  // AppError object
  const error = new AppError("Route not found", 404);

  next(error);
});

app.use(
  // Before
  // (err, req, res, next) => {
  //     err.status = err.status || "error"
  //     err.statusCode = err.statusCode || 500

  //     res.status(err.statusCode).json({
  //         status: err.status,
  //         message: err.message
  //     })
  // }

  globalErrorHandler
);

module.exports = app;
