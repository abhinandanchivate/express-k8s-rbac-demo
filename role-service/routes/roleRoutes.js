/* Role routes */ import express from "express";
import {
  assignRole,
  getAllRoles,
  getRoleByUser,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/assign", assignRole);
router.get("/", getAllRoles);
router.get("/:userId", getRoleByUser);
router.put("/:userId", updateRole);
router.delete("/:userId", deleteRole);

export default router;
