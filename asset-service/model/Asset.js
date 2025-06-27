/* Asset schema */
import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["assigned", "unassigned"],
    default: "unassigned",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Asset", assetSchema);
