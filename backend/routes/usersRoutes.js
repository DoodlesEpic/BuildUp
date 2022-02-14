const express = require("express");
const {
  registerUser,
  authenticateUser,
  updateMe,
  getMe,
  deleteMe,
} = require("../controllers/usersController");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", authenticateUser);
router.put("/me", updateMe);
router.get("/me", getMe);
router.delete("/me", deleteMe);

module.exports = router;
