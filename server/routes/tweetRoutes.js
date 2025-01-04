const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const auth = require("../middleware/auth");

// Routes
router.post("/postTweet", auth.checkAccessToken, tweetController.postTweet);

module.exports = router;
