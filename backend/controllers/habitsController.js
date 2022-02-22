const asyncHandler = require("express-async-handler");
const Habit = require("../models/habitsModel");

/**
 * @desc  Get all habits belonging to a user
 * @route  GET /api/Habits
 * @access Private
 */
const getHabits = asyncHandler(async (req, res) => {
  res.json("Get habits");
});

/**
 * @desc  Create a habit
 * @route  POST /api/Habits
 * @access Private
 */
const createHabit = asyncHandler(async (req, res) => {
  res.json("Create habit");
});

/**
 * @desc  Update a habit
 * @route  PUT /api/Habits/:id
 * @access Private
 */
const updateHabit = asyncHandler(async (req, res) => {
  res.json("Update habit");
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
