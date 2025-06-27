/* Role controller logic */ import Role from "../model/Role.js";

export const assignRole = async (req, res) => {
  const { userId, role } = req.body;
  const assigned = await Role.findOneAndUpdate(
    { userId },
    { role },
    { upsert: true, new: true }
  );
  res.status(200).json(assigned);
};

export const getAllRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

export const getRoleByUser = async (req, res) => {
  const role = await Role.findOne({ userId: req.params.userId });
  if (!role) return res.status(404).json({ msg: "Role not found" });
  res.json(role);
};

export const updateRole = async (req, res) => {
  const updated = await Role.findOneAndUpdate(
    { userId: req.params.userId },
    { role: req.body.role },
    { new: true }
  );
  res.json(updated);
};

export const deleteRole = async (req, res) => {
  await Role.findOneAndDelete({ userId: req.params.userId });
  res.json({ msg: "Role deleted" });
};
