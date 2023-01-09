const express = require("express");

const { testPost, getAllPosts,getPostById, createPost,updatePost,deletePost } = require("../controllers/postController");

const router = express.Router();

router.route("/test").get(testPost);
router.route("/all").get(getAllPosts);
router.route("/:id").get(getPostById);
router.route("/").post(createPost);
router.route("/:id").patch(updatePost);
router.route("/:id").delete(deletePost);

module.exports = router;
