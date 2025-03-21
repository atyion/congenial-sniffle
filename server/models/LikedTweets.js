const mongoose = require("mongoose");

const likedTweetSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tweetID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
  },
  { collection: "LikedTweets" }
);

const LikedTweet = mongoose.model("LikedTweet", likedTweetSchema);

module.exports = LikedTweet;
