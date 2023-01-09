const fs = require("fs");
const path = require("path");

const testPost = (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Post working",
  });
};

const SAMPLE_POSTS = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../test/data/posts.json"))
);

const getAllPosts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: SAMPLE_POSTS,
  });
};

const getPostById = (req, res) => {
  const id = req.params.id * 1;
  const post = SAMPLE_POSTS.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  return res.status(200).json({
    status: "success",
    data: post,
  });
};

const createPost = (req, res) => {
  const newId = SAMPLE_POSTS[SAMPLE_POSTS.length - 1].id + 1;

  console.log(req.body);

  const newPost = Object.assign({
    id: newId,
    title: req.body.title,
    content: req.body.content,
    createdAt: Date.now(),
  });

  SAMPLE_POSTS.push(newPost);

  fs.writeFile(
    path.resolve(__dirname, "../../test/data/posts.json"),
    JSON.stringify(SAMPLE_POSTS),
    (err) => {
      res.status(201).json({
        status: "success",
        data: newPost,
      });
    }
  );
};

const updatePost = (req, res) => {
  const id = req.params.id * 1;
  const post = SAMPLE_POSTS.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  const updatedPosts = SAMPLE_POSTS.map((post) => {
    if (post.id === id) {
      return {
        ...post,
        title: req.body.title,
        content: req.body.content,
        createdAt: Date.now(),
      };
    }

    return post;
  });

  fs.writeFile(
    path.resolve(__dirname, "../../test/data/posts.json"),
    JSON.stringify(updatedPosts),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "post updated",
      });
    }
  );
};

const deletePost = (req, res) => {
  const id = req.params.id * 1;
  const post = SAMPLE_POSTS.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  const updatedPosts = SAMPLE_POSTS.map((item) => {
    if (item.id !== id) {
      return item;
    }
  });

  fs.writeFile(
    path.resolve(__dirname, "../../test/data/posts.json"),
    JSON.stringify(updatedPosts),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "post deleted",
      });
    }
  );
};

module.exports = {
  testPost,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
