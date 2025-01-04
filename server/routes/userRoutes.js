const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Routes

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
