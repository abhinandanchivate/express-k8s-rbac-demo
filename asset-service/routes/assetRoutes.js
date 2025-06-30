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

router.post("/create", createAsset);
router.get("/", getAllAssets);
router.get("/search", searchAssets);
router.get("/user/:userId", getAssetsByUser);
router.get("/:id", getAssetById);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

export default router;
