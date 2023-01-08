const express = require("express");

const { testPost } = require("../controllers/postController");

const router = express.Router();

router.route("/test").get(testPost);

module.exports = router;
