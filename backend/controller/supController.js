const sup = require("../models/Supplier/SupModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await sup.find(); 
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error retrieving users:", err);
    return res.status(500).json({ message: "An error occurred while retrieving users." });
  }
};

// Data insert
const addUsers = async (req, res, next) => {
  const { name, company, phoneNo, email, address } = req.body;

  let user;
  try {
    user = new sup({ name, company, phoneNo, email, address });
    await user.save(); 
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Unable to add user", error: error.message });
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to add user" });
  }
  return res.status(200).json({ message: "User added successfully", user });
};

// Get user by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await sup.findById(id);
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    return res.status(500).json({ message: "An error occurred while retrieving the user." });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User found", user });
};

// Update user details
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, company, phoneNo, email, address } = req.body;

  let user;
  try {
    user = await sup.findByIdAndUpdate(id, { name, company, phoneNo, email, address }, { new: true });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "An error occurred while updating the user." });
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to update user data" });
  }

  return res.status(200).json({ message: "User updated successfully", user });
};

// Delete user details
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;
  try {
    user = await sup.findByIdAndDelete(id);
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ message: "An error occurred while deleting the user." });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User deleted successfully", user });
};

module.exports = { getAllUsers, addUsers, getById, updateUser, deleteUser };
