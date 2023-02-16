import { router } from "express";
import {
  registerUser,
  authenticateUser,
  updateMe,
  getMe,
  deleteMe,
} from "../controllers/usersController";
import { protect } from "../middleware/authenticationMiddleware";

router.post("/", registerUser);
router.post("/login", authenticateUser);
router.put("/me", protect, updateMe);
router.get("/me", protect, getMe);
router.delete("/me", protect, deleteMe);

module.exports = router;
