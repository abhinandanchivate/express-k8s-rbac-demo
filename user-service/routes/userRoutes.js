/* User routes */ import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.get("/profile/me", authMiddleware, getProfile);

export default router;
