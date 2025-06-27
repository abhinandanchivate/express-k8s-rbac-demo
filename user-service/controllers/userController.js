/* User controller logic */ import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  // Retry logic: assign default role via role-service with fallback
  try {
    const roleServiceUrl =
      config.get("ROLE_SERVICE_URL") ||
      "http://role-service:5003/api/v6/roles/assign";
    let success = false;
    for (let attempt = 1; attempt <= 3 && !success; attempt++) {
      try {
        const res = await fetch(roleServiceUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, role: "viewer" }),
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        success = true;
      } catch (err) {
        console.error(`Attempt ${attempt}: Failed to assign role`, err.message);
        if (attempt < 3) await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  } catch (err) {
    console.error("Failed to assign default role:", err.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, config.get("JWT_SECRET"));
  res.json({ token });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
};
