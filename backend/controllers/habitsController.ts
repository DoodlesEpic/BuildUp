import * as asyncHandler from "express-async-handler";
import Habit from "../models/habitsModel";
import HabitDays from "../models/habitDayModel";

/**
 * @desc  Get all habits belonging to a user
 * @route  GET /api/habits
 * @access Private
 */
export const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user.id });
  res.json(habits);
});

/**
 * @desc  Get all days belonging to a habit
 * @route  GET /api/habits/:id
 * @access Private
 */
export const getHabitDays = asyncHandler(async (req, res) => {
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
export const createHabit = asyncHandler(async (req, res) => {
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
export const createHabitDay = asyncHandler(async (req, res) => {
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

  // TODO: Check if the day already exists
  // TODO: Check if the day is in the future

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
export const updateHabit = asyncHandler(async (req, res) => {
  // Grab the habit
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
 * @desc  Update a habit day
 * @route  PUT /api/habits/:id/:day
 * @access Private
 */
export const updateHabitDay = asyncHandler(async (req, res) => {
  // Grab the habit
  const habit = await Habit.findById(req.params.id);

  // Treat habit not found and not authrorized as the same error
  // So we don't leak the habit's existence for other users
  if (!habit || habit.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Habit not found for updating");
  }

  // Grab the habit day
  const habitDay = await HabitDays.findById(req.params.day);
  if (!habitDay) {
    res.status(400);
    throw new Error("Habit day not found");
  }

  // Update the habit day
  // Don't allow the user to change the habit this habit day belongs to
  habitDay.day = req.body.day;
  habitDay.status = req.body.status;
  habitDay.markModified("day"); // https://mongoosejs.com/docs/schematypes.html#dates
  await habitDay.save();

  res.json(habit);
});

/**
 * @desc  Delete a habit
 * @route  DELETE /api/habits/:id
 * @access Private
 */
export const deleteHabit = asyncHandler(async (req, res) => {
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

/**
 * @desc  Delete a habit day
 * @route  DELETE /api/habits/:id/:day
 * @access Private
 */
export const deleteHabitDay = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  // Treat habit not found and not authrorized as the same error
  // So we don't leak the habit's existence for other users
  if (!habit || habit.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Habit not found for deletion");
  }

  const habitDay = await HabitDays.findById(req.params.day);
  if (!habitDay) {
    res.status(400);
    throw new Error("Habit day not found for deletion");
  }
  habitDay.delete();

  res.json(habitDay);
});
