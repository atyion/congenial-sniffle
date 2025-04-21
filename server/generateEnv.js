const fs = require("fs");
const crypto = require("crypto");

// Function to generate a random string
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

// Generate random secrets
const jwtSecret = generateRandomString(16); // 16 bytes = 32 hex characters
const jwtRefreshSecret = generateRandomString(16);

const envContent = `JWT_SECRET=${jwtSecret}
JWT_REFRESH_SECRET=${jwtRefreshSecret}
`;

fs.writeFile(".env", envContent, (err) => {
  if (err) {
    console.error("Error writing .env file:", err);
  } else {
    console.log(".env file generated successfully!");
  }
});
