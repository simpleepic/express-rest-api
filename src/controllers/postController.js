const Post = require("../models/postModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error/appError")


// Retrieve
const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post is not exists", 404))
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
});

// Create
const createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(200).json({
    status: "success",
    data: newPost,
  });
});

// Update
const updatePost = catchAsync(async (req, res, next) => {
  const updatedPost = await Post.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedPost,
  });
});

// Delete
const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError("Post is not exists", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Post is deleted",
  });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
