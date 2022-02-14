const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");

/**
 * @desc  Get all notes
 * @route  GET /api/notes
 * @access Private
 */
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

/**
 * @desc  Create a note
 * @route  POST /api/notes
 * @access Private
 */
const createNote = asyncHandler(async (req, res) => {
  // Validate if the required fields are present
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please provide title and content");
  }

  // Create the note and return it
  const note = await Note.create({
    user: req.user.id,
    title: req.body.title,
    content: req.body.content,
  });
  res.json(note);
});

/**
 * @desc  Update a note
 * @route  PUT /api/notes/:id
 * @access Private
 */
const updateNote = asyncHandler(async (req, res) => {
  // Grab the note
  const note = await Note.findById(req.params.id);

  // Treat note not found and not authrorized as the same error
  // So we don't leak the note's existence for other users
  if (!note || note.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Note not found for updating");
  }

  // Update the note
  note.title = req.body.title;
  note.content = req.body.content;
  await note.save();

  res.json(note);
});

/**
 * @desc  Delete a note
 * @route  DELETE /api/notes/:id
 * @access Private
 */
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found for deletion");
  }

  res.json(note);
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
