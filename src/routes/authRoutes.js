const express = require("express");

const { testAuth } = require("../controllers/authController");

const router = express.Router();

router.route("/test").get(testAuth);

module.exports = router;
