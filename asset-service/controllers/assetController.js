/* Asset controller logic */
import Asset from "../model/Asset.js";
import redisClient from "../utils/redisClient.js";
import config from "config";
import axios from "axios";

const ROLE_SERVICE_URL = config.get("ROLE_SERVICE_URL");

const verifyPermission = async (userId, allowedRoles) => {
  try {
    const { data } = await axios.get(`${ROLE_SERVICE_URL}/${userId}`);
    return allowedRoles.includes(data.role);
  } catch (err) {
    console.error("Role check failed:", err.message);
    return false;
  }
};

export const createAsset = async (req, res) => {
  const allowed = await verifyPermission(req.user.userId, ["admin", "editor"]);
  if (!allowed) return res.status(403).json({ msg: "Access Denied" });

  const asset = await Asset.create({ ...req.body, userId: req.user.userId });
  res.status(201).json(asset);
};

export const getAllAssets = async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
};

export const getAssetById = async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  res.json(asset);
};

export const updateAsset = async (req, res) => {
  const allowed = await verifyPermission(req.user.userId, ["admin", "editor"]);
  if (!allowed) return res.status(403).json({ msg: "Access Denied" });

  const updated = await Asset.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteAsset = async (req, res) => {
  const allowed = await verifyPermission(req.user.userId, ["admin"]);
  if (!allowed) return res.status(403).json({ msg: "Access Denied" });

  await Asset.findByIdAndDelete(req.params.id);
  res.json({ msg: "Asset deleted" });
};

export const getAssetsByUser = async (req, res) => {
  const assets = await Asset.find({ userId: req.params.userId });
  res.json(assets);
};

export const searchAssets = async (req, res) => {
  const q = req.query.q;
  const cacheKey = `asset-search:${q}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const result = await Asset.find({
    $or: [{ name: new RegExp(q, "i") }, { description: new RegExp(q, "i") }],
  });

  await redisClient.setEx(cacheKey, 300, JSON.stringify(result));
  res.json(result);
};
