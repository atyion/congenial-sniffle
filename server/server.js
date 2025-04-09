const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db"); // DB config
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // The origin of your Vite app
    credentials: true, // Allow cookies and credentials to be sent
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/users", userRoutes);
app.use("/tweets", require("./routes/tweetRoutes"));

// Start server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
