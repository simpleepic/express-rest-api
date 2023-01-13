const fs = require("fs");
const path = require("path");

const Post = require("../models/postModel");

const testPost = (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Post working",
  });
};



const getAllPosts = async(req, res) => {
  try {
    const posts = await Post.find();

    res.status(201).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const getPostById = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

const deletePost = async(req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "success",
      message: "post deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = {
  testPost,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
