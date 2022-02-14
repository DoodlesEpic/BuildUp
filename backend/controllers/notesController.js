/**
 * @desc  Get all notes
 * @route  GET /api/notes
 * @access Private
 */
const getNotes = (req, res) => {
  res.json({ message: "Get notes" });
};

/**
 * @desc  Create a note
 * @route  POST /api/notes
 * @access Private
 */
const createNote = (req, res) => {
  res.json({ message: "Create note" });
};

/**
 * @desc  Update a note
 * @route  PUT /api/notes/:id
 * @access Private
 */
const updateNote = (req, res) => {
  res.json({ message: `Update note ${req.params.id}` });
};

/**
 * @desc  Delete a note
 * @route  DELETE /api/notes/:id
 * @access Private
 */
const deleteNote = (req, res) => {
  res.json({ message: `Delete note ${req.params.id}` });
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
