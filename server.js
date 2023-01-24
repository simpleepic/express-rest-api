const colors = require("colors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({path: "./config.env"})

const app = require("./src/app")

// Database connection
mongoose.set("strictQuery", false)
mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true}).then(
    () => console.log(colors.yellow("Database is Connected"))
)

// Server running
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(colors.yellow(`Server is running now on port ${PORT} as ${process.env.NODE_ENV} mode`));
})