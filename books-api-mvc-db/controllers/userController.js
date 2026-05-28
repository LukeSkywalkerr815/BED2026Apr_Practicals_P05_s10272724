const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Controller error in createUser:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Controller error in getAllUsers:", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Controller error in getUserById:", error);
    res.status(500).json({ message: "Error retrieving user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.updateUser(parseInt(req.params.id), req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    console.error("Controller error in updateUser:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const success = await User.deleteUser(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (error) {
    console.error("Controller error in deleteUser:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

exports.searchUsers = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }
  try {
    const users = await User.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    console.error("Controller error in searchUsers:", error);
    res.status(500).json({ message: "Error searching users" });
  }
};

exports.getUsersWithBooks = async (req, res) => {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error("Controller error in getUsersWithBooks:", error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
};