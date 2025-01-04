const Tweet = require("../models/Tweets");

exports.postTweet = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id; // Ensure this is correctly set as an ObjectId
    console.log(userId);

    const newTweet = new Tweet({
      text,
      user: userId,
    });

    await newTweet.save();

    res
      .status(201)
      .json({ message: "Tweet posted successfully", tweet: newTweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
