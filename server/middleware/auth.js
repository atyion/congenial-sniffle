const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.checkAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken; // Extract refresh token from cookies

  console.log("Trying to authenticate using refresh token");

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the refresh token using JWT refresh secret key
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const userID = decoded.user.id;
    console.log("Authenticated User ID:", userID);

    // Attach user ID to the request object
    req.userID = userID;

    // Check if the user exists
    const user = await User.findById(userID);
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    return next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token Verification Error:", err.message);
    return res.status(401).json({
      message: "Invalid or expired refresh token.",
      error: err.message,
    });
  }
};

exports.checkValidEmail = async (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  next();
};

exports.checkEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error.", error: err.message });
  }
};

exports.checkUsernameExist = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exists." });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error.", error: err.message });
  }
};
