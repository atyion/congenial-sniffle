const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const auth = require("../middleware/auth");

// Routes
router.post("/postTweet", auth.checkAccessToken, tweetController.postTweet);
router.get("/getTweets", tweetController.getTweets);
router.get("/getTweet/:id", auth.checkAccessToken, tweetController.getTweet);

module.exports = router;
