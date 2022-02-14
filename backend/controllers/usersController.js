/**
 * @desc  Register a new user
 * @route  POST /api/users
 * @access Public
 */
const registerUser = (req, res) => {
  res.json({ message: "Register user" });
};

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
