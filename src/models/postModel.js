const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title shouldn't be empty"],
        minLength: [2, "Title name can not be smaller than 2 characters"],
        maxLength: [50, "Title name can not be bigger than 50 characters"]
    },
    content: {
        type: String,
        required: [true, "Title shouldn't be empty"],
        minLength: [2, "Title name can not be smaller than 2 characters"],
        maxLength: [50, "Title name can not be bigger than 50 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post