class AppError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error" // 400 - 499 = Client error | 500 - 599 = Server error
        this.isOperational = true // This distiguishes trusted user and unknown user

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError