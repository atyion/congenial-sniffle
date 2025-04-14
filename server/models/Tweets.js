const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Tweets" }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
