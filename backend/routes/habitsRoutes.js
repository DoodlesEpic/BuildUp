const express = require("express");
const router = express.Router();
const {
  getHabits,
  getHabitDays,
  createHabit,
  createHabitDay,
  updateHabit,
  updateHabitDay,
  deleteHabit,
  deleteHabitDay,
} = require("../controllers/habitsController");
const { protect } = require("../middleware/authenticationMiddleware");

router.get("/", protect, getHabits);
router.get("/:id", protect, getHabitDays);
router.post("/", protect, createHabit);
router.post("/:id", protect, createHabitDay);
router.put("/:id", protect, updateHabit);
router.put("/:id/:day", protect, updateHabitDay);
router.delete("/:id", protect, deleteHabit);
router.delete("/:id/:day", protect, deleteHabitDay);

module.exports = router;
