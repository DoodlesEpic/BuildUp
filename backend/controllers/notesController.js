const asyncHandler = require("express-async-handler");

/**
 * @desc  Get all notes
 * @route  GET /api/notes
 * @access Private
 */
const getNotes = asyncHandler(async (req, res) => {
  res.json({ message: "Get notes" });
});

/**
 * @desc  Create a note
 * @route  POST /api/notes
 * @access Private
 */
const createNote = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please provide title and content");
  }

  res.json({ message: "Create note" });
});

/**
 * @desc  Update a note
 * @route  PUT /api/notes/:id
 * @access Private
 */
const updateNote = asyncHandler(async (req, res) => {
  res.json({ message: `Update note ${req.params.id}` });
});

/**
 * @desc  Delete a note
 * @route  DELETE /api/notes/:id
 * @access Private
 */
const deleteNote = asyncHandler(async (req, res) => {
  res.json({ message: `Delete note ${req.params.id}` });
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
