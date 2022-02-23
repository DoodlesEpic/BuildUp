const asyncHandler = require("express-async-handler");
const Habit = require("../models/habitsModel");
const HabitDays = require("../models/habitDayModel");

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
 * @desc  Get all days belonging to a habit
 * @route  GET /api/habits/:id
 * @access Private
 */
const getHabitDays = asyncHandler(async (req, res) => {
  // Grab the habit
  const habit = await Habit.findById(req.params.id);

  // Treat habit not found and not authrorized as the same error
  // So we don't leak the habit's existence for other users
  if (!habit || habit.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Habit not found for getting days");
  }

  const habitDays = await HabitDays.find({ habit: req.params.id });
  res.json(habitDays);
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
 * @desc  Create a day belonging to a habit
 * @route  POST /api/habits/:id
 * @access Private
 */
const createHabitDay = asyncHandler(async (req, res) => {
  // Grab the habit
  const habit = await Habit.findById(req.params.id);

  // Treat habit not found and not authrorized as the same error
  // So we don't leak the habit's existence for other users
  if (!habit || habit.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Habit not found for day creation");
  }

  // Validate if the required fields are present
  if (!req.body.day || !req.body.status) {
    res.status(400);
    throw new Error("Please provide a day and a status");
  }

  // Create the habit and return it
  const habitDay = await HabitDays.create({
    habit: req.params.id,
    day: req.body.day,
    status: req.body.status,
  });
  res.json(habitDay);
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
  const habit = await Habit.findById(req.params.id);

  // Treat habit not found and not authrorized as the same error
  // So we don't leak the habit's existence for other users
  if (!habit || habit.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Habit not found for deletion");
  }

  habit.delete();

  res.json(habit);
});

module.exports = {
  getHabits,
  getHabitDays,
  createHabit,
  createHabitDay,
  updateHabit,
  deleteHabit,
};
