const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * @desc  Register a new user
 * @route  POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    res.status(400);
    throw new Error("Please provide email, password and username");
  }

  const userEmailExists = await User.findOne({ email });
  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already in use");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create the user
  const user = await User.create({
    email: req.body.email,
    password: hashedPassword, // Save the HASHED password for the love of god
    username: req.body.username,
  });

  // Verify the user
  if (user) {
    res
      .status(201)
      .json({ _id: user._id, email: user.email, username: user.username });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

/**
 * @desc  Authenticate a user
 * @route  POST /api/users/login
 * @access Public
 */
const authenticateUser = (req, res) => {
  res.json({ message: "Authenticate user" });
};

/**
 * @desc  Get current user data
 * @route  GET /api/users/me
 * @access Private
 */
const getMe = (req, res) => {
  res.json({ message: "Get me" });
};

/**
 * @desc  Update user data
 * @route  PUT /api/users/me
 * @access Private
 */
const updateMe = (req, res) => {
  res.json({ message: "Update user" });
};

/**
 * @desc  Delete current user
 * @route  DELETE /api/users/me
 * @access Private
 */
const deleteMe = (req, res) => {
  res.json({ message: "Delete user" });
};

module.exports = {
  registerUser,
  authenticateUser,
  getMe,
  updateMe,
  deleteMe,
};
