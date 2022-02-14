const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");

/**
 * @desc  Get all notes
 * @route  GET /api/notes
 * @access Private
 */
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
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
  const note = await Note.create(req.body);
  res.json(note);
});

/**
 * @desc  Update a note
 * @route  PUT /api/notes/:id
 * @access Private
 */
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!note) {
    res.status(400);
    throw new Error("Note not found for updating");
  }

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
