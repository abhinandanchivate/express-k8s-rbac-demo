/* Asset routes */
import express from "express";
import {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  getAssetsByUser,
  searchAssets,
} from "../controllers/assetController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createAsset);
router.get("/", authMiddleware, getAllAssets);
router.get("/search", authMiddleware, searchAssets);
router.get("/user/:userId", authMiddleware, getAssetsByUser);
router.get("/:id", authMiddleware, getAssetById);
router.put("/:id", authMiddleware, updateAsset);
router.delete("/:id", authMiddleware, deleteAsset);

export default router;
