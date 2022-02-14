const express = require("express");
const router = express.Router();
const {
  registerUser,
  authenticateUser,
  updateMe,
  getMe,
  deleteMe,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authenticationMiddleware");

router.post("/", registerUser);
router.post("/login", authenticateUser);
router.put("/me", protect, updateMe);
router.get("/me", protect, getMe);
router.delete("/me", protect, deleteMe);

module.exports = router;
