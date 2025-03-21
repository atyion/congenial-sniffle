const Tweet = require("../models/Tweets");

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
    const tweets = await Tweet.find().populate("user", "username").limit(10);
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
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await Tweet.findByIdAndDelete(req.params.id); // <-- CORRETTO
    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
