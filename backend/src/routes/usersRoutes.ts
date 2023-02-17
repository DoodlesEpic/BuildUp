import { Router } from "express";
import {
  registerUser,
  authenticateUser,
  updateMe,
  getMe,
  deleteMe,
} from "../controllers/usersController";
import { protect } from "../middleware/authenticationMiddleware";
const usersRouter = Router();

usersRouter.post("/", registerUser);
usersRouter.post("/login", authenticateUser);
usersRouter.put("/me", protect, updateMe);
usersRouter.get("/me", protect, getMe);
usersRouter.delete("/me", protect, deleteMe);

export default usersRouter;
