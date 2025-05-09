const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const auth = require("../middleware/auth");

// Routes
router.post("/postTweet", auth.checkAccessToken, tweetController.postTweet);
router.get("/getTweets", tweetController.getTweets);
router.get("/getTweet/:id", tweetController.getTweet);
router.delete(
  "/deleteTweet/:id",
  auth.checkAccessToken,
  tweetController.deleteTweet
);
router.put("/likeTweet/:id", auth.checkAccessToken, tweetController.likeTweet);
router.get("/getLikedTweets/:id", tweetController.getTweetLikesCount);
router.delete(
  "/unlikeTweet/:id",
  auth.checkAccessToken,
  tweetController.unlikeTweet
);
router.post(
  "/commentTweet/:id",
  auth.checkAccessToken,
  tweetController.commentTweet
);
router.get("/getComments", tweetController.getComments);
router.get("/getCountComments", tweetController.getCommentsCount);
router.delete(
  "/deleteComment/:id",
  auth.checkAccessToken,
  tweetController.deleteComment
);
router.get("/getUserTweets", tweetController.getUserTweets);
router.get(
  "/isTweetLiked/:id",
  auth.checkAccessToken,
  tweetController.isTweetLiked
);
module.exports = router;
