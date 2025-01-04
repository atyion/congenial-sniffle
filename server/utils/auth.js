const jwt = require("jsonwebtoken");

// Generate Access Token
const generateAccessToken = (userId) => {
  const payload = { user: { id: userId } };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" }); // Expire in 15 minutes
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  const payload = { user: { id: userId } };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" }); // Expire in 7 days
};

module.exports = { generateAccessToken, generateRefreshToken };
