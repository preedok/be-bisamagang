const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersModels = require("../models/users.models");

// get all users
async function getUsers(req, res) {
  try {
    const users = await usersModels.getAllUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// get user by username
async function getUserByUsername(req, res) {
  const { username } = req.params;
  const user = await usersModels.getUserByUsername(username);
  res.json(user);
}

// add user
async function addUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
      console.log(
        `[ERROR] Failed to add user: Incomplete data for user ${username}`
      );
      return res.status(400).json({
        error: "Incomplete data. Username, email, and password are required",
      });
    }

    const newUser = await usersModels.addUser(req.body);
    console.log(`[SUCCESS] User successfully added: ${username} (${email})`);
    res.status(201).json({
      message: "User successfully added",
      user: newUser,
    });
  } catch (error) {
    console.error("[ERROR] Failed to add user:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to add user  ",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { username } = req.params;

    // Validasi username
    if (!username || username.trim() === "") {
      console.error("[ERROR] Delete user failed: Username is empty");
      return res.status(400).json({
        status: "error",
        message: "Username is required",
      });
    }

    // Cek apakah user exists sebelum delete
    const existingUser = await usersModels.getUserByUsername(username);
    if (!existingUser) {
      console.error(`[ERROR] Delete user failed: User ${username} not found`);
      return res.status(404).json({
        status: "error",
        message: `User ${username} not found`,
      });
    }

    try {
      await usersModels.deleteUser(username);

      console.log(
        `[SUCCESS] User ${username} successfully deleted at ${new Date().toISOString()}`
      );
      return res.status(200).json({
        status: "success",
        message: `User ${username} successfully deleted`,
        data: existingUser,
      });
    } catch (dbError) {
      console.error(
        `[ERROR] Database error while deleting user ${username}: ${dbError.message}`
      );
      return res.status(500).json({
        status: "error",
        message: "Failed to delete user due to database error",
      });
    }
  } catch (error) {
    console.error(`[ERROR] Delete user error: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

module.exports = { getUsers, addUser, getUserByUsername, deleteUser };
