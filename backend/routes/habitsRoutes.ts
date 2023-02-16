import { router } from "express";
import {
  getHabits,
  getHabitDays,
  createHabit,
  createHabitDay,
  updateHabit,
  updateHabitDay,
  deleteHabit,
  deleteHabitDay,
} from "../controllers/habitsController";
import { protect } from "../middleware/authenticationMiddleware";

// Habit routes
router.get("/", protect, getHabits);
router.post("/", protect, createHabit);
router.put("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);

// Habit days routes
router.get("/:id/habitDay", protect, getHabitDays);
router.post("/:id/habitDay", protect, createHabitDay);
router.put("/:id/habitDay/:day", protect, updateHabitDay);
router.delete("/:id/habitDay/:day", protect, deleteHabitDay);

module.exports = router;
