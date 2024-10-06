const Staff = require("../models/Staff/StaffModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Staff.find(); // Use 'Staff' model to find users
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
  const { name, empID, jobName, email, phone, NIC, basicSalary, designation } = req.body;

  let user;
  try {
    user = new Staff({ name, empID, jobName, email, phone, NIC, basicSalary, designation });
    await user.save();
  } catch (error) {
    return res.status(500).json({ message: "Unable to add user", error: error.message });
  }

  return res.status(200).json({ message: "User added successfully", user });
};

// Get user by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await Staff.findById(id);
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    return res.status(500).json({ message: "An error occurred while retrieving the user." });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User found", user });
};

// Update user
const updateUser = async (req, res, next) => {
  const { name, empID, jobName, email, phone, NIC, basicSalary, designation } = req.body;

  let user;
  try {
    user = await Staff.findByIdAndUpdate(req.params.id, { name, empID, jobName, email, phone, NIC, basicSalary, designation });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update user", error: error.message });
  }

  return res.status(200).json({ message: "User updated successfully", user });
};

// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await Staff.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to delete user data" });
  }

  return res.status(200).json({ message: "User deleted successfully", user });
};

module.exports = { getAllUsers, addUsers, getById, updateUser, deleteUser };
