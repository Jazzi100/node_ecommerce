const express = require("express");

const router = express.Router();

// Controller function
const {
  loginUser,
  signupUser,
  logoutUser,
} = require("../controllers/userController");

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Signup route
router.post("/signup", signupUser);

module.exports = router;
