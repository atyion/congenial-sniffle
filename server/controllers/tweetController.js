const Tweet = require("../models/Tweets");
const LikedTweet = require("../models/LikedTweets");
const Comment = require("../models/CommentTweets");

exports.postTweet = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.userID; // Ensure this is correctly set as an ObjectId

    console.log(userId);

    const newTweet = new Tweet({
      text,
      user: req.userID,
    });

    await newTweet.save();

    res
      .status(201)
      .json({ message: "Tweet posted successfully", tweet: newTweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate("user", "username")
      .limit(10);
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate(
      "user",
      "username"
    );
    res.status(200).json({ tweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTweet = async (req, res) => {
  try {
    const userId = req.userID;
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    if (tweet.user.toString() !== userId) {
      return res.status(403).json({
        error: "Unauthorized action. You can't delete other people's posts",
      });
    }

    await Tweet.findByIdAndDelete(req.params.id); // <-- CORRETTO
    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeTweet = async (req, res) => {
  try {
    const userId = req.userID;
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    const existingLike = await LikedTweet.findOne({
      user: userId,
      tweet: tweetId,
    });
    if (existingLike) {
      return res.status(400).json({ error: "Tweet already liked" });
    }

    const newLike = new LikedTweet({ userID: userId, tweetID: tweetId });
    await newLike.save();

    res.status(200).json({ message: "Tweet liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unlikeTweet = async (req, res) => {
  try {
    const userId = req.userID;
    const tweetId = req.params.id;

    const deletedLike = await LikedTweet.findOneAndDelete({
      userID: userId,
      tweetID: tweetId,
    });

    if (!deletedLike) {
      return res.status(404).json({ error: "Like not found" });
    }

    res.status(200).json({ message: "Tweet unliked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTweetLikesCount = async (req, res) => {
  try {
    const tweetId = req.body.id;

    const likeCount = await LikedTweet.countDocuments({ tweetID: tweetId });

    res.status(200).json({ tweetId, likeCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.commentTweet = async (req, res) => {
  try {
    const userId = req.userID;
    const tweetId = req.params.id;
    const { text } = req.body;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    const newComment = new Comment({
      userID: userId,
      tweetID: tweetId,
      content: text,
    });

    await newComment.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const tweetId = req.body.id;

    const comments = await Comment.find({ tweetID: tweetId }).populate(
      "userID",
      "username"
    );

    if (!comments) {
      return res
        .status(404)
        .json({ error: "No comments found for this tweet" });
    }

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentsCount = async (req, res) => {
  try {
    const tweetId = req.body.id;

    const commentCount = await Comment.countDocuments({ tweetID: tweetId });

    res.status(200).json({ tweetId, commentCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const userId = req.userID;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userID.toString() !== userId) {
      return res.status(403).json({
        error: "Unauthorized action. You can't delete other people's comments",
      });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserTweets = async (req, res) => {
  try {
    const userId = req.params.id;

    const tweets = await Tweet.find({ user: userId }).populate(
      "user",
      "username"
    );

    if (!tweets.length) {
      return res.status(404).json({ error: "No tweets found for this user" });
    }

    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.isTweetLiked = async (req, res) => {
  try {
    const userId = req.userID;
    const tweetId = req.params.id;

    const likedTweet = await LikedTweet.findOne({
      userID: userId,
      tweetID: tweetId,
    });

    res.status(200).json({ isLiked: !!likedTweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
