/* Role schema */ import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  role: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
});

export default mongoose.model("Role", roleSchema);
