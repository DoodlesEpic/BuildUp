const asyncHandler = require("express-async-handler");
const Habit = require("../models/habitsModel");

/**
 * @desc  Get all habits belonging to a user
 * @route  GET /api/habits
 * @access Private
 */
const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user.id });
  res.json(habits);
});

/**
 * @desc  Create a habit
 * @route  POST /api/habits
 * @access Private
 */
const createHabit = asyncHandler(async (req, res) => {
  // Validate if the required fields are present
  if (!req.body.habitName) {
    res.status(400);
    throw new Error("Please provide a name for the habit");
  }

  // Create the habit and return it
  const habit = await Habit.create({
    user: req.user.id,
    habitName: req.body.habitName,
  });
  res.json(habit);
});

/**
 * @desc  Update a habit
 * @route  PUT /api/habits/:id
 * @access Private
 */
const updateHabit = asyncHandler(async (req, res) => {
  // Grab the note
  const habit = await Habit.findById(req.params.id);

  // Treat habit not found and not authrorized as the same error
  // So we don't leak the habit's existence for other users
  if (!habit || habit.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Habit not found for updating");
  }

  // Update the habit
  habit.habitName = req.body.habitName;
  await habit.save();

  res.json(habit);
});

/**
 * @desc  Delete a habit
 * @route  DELETE /api/Habits/:id
 * @access Private
 */
const deleteHabit = asyncHandler(async (req, res) => {
  res.json("Delete habit");
});

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
