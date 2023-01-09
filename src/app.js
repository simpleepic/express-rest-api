const express = require("express")

const authRouter = require("./routes/authRoutes")
const postRouter = require("./routes/postRoutes")

const app = express();

app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postRouter)

app.all("*", (req,res,next) => {
    console.log("Route not found");

    next()
})

module.exports = app