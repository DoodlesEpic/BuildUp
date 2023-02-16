import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

/**
 * @desc  Register a new user
 * @route  POST /api/users
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate if the required fields are present
  if (!email || !password || !username) {
    res.status(400);
    throw new Error("Please provide email, password and username");
  }

  // Validate if the email is already in use
  const userEmailExists = await User.findOne({ email });
  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  // Validate if the username is already in use
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
  if (!user) {
    res.status(400);
    throw new Error("User not created");
  }

  // Return the newly created user
  res.status(201).json({
    id: user.id,
    email: user.email,
    username: user.username,
    token: generateToken(user.id),
  });
});

/**
 * @desc  Authenticate a user
 * @route  POST /api/users/login
 * @access Public
 */
export const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate if the required fields are present
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Grab the user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials"); // Throw the same error as when the password is wrong so we don't leak the user existence
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password); // Compare the HASHED password with the one provided
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // Send the token to the client
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    token: generateToken(user.id),
  });
});

/**
 * @desc  Get current user data
 * @route  GET /api/users/me
 * @access Private
 */
export const getMe = asyncHandler(async (req, res) => {
  // Grab the user data (except the password)
  const { id, username, email } = req.user;

  res.json({ id, username, email });
});

/**
 * @desc  Update user data
 * @route  PUT /api/users/me
 * @access Private
 */
export const updateMe = asyncHandler(async (req, res) => {
  res.json({ message: "Update user" });
});

/**
 * @desc  Delete current user
 * @route  DELETE /api/users/me
 * @access Private
 */
export const deleteMe = asyncHandler(async (req, res) => {
  res.json({ message: "Delete user" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
