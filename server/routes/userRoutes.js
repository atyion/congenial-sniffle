const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Routes

router.post(
  "/register",
  auth.checkValidEmail,
  auth.checkEmailExists,
  auth.checkUsernameExist,
  userController.registerUser
);
router.post("/login", userController.loginUser);
router.get("/refresh", userController.checkRefreshToken);
router.get("/info/:id", userController.getUserInfo);
module.exports = router;
