import { Router } from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController";
import { protect } from "../middleware/authenticationMiddleware";
const notesRouter = Router();

notesRouter.get("/", protect, getNotes);
notesRouter.post("/", protect, createNote);
notesRouter.put("/:id", protect, updateNote);
notesRouter.delete("/:id", protect, deleteNote);

export default notesRouter;
