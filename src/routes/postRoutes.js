const express = require("express")

const {getAllPosts, getPostById, createPost, updatePost, deletePost} = require("../controllers/postController")

const router = express.Router()

router.route("/all").get(getAllPosts)
router.route("/:id").get(getPostById) // /post/123
router.route("/").post(createPost) 
router.route("/:id").patch(updatePost) 
router.route("/:id").delete(deletePost) 

module.exports = router