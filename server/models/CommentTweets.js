const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "Comments" }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
