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
    console.log(decoded.user);
    req.user = decoded.user; // Attach user data to the request object

    // Check if the user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    return next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired refresh token.",
      error: err.message,
    });
  }
};
