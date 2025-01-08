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
    // More specific error handling
    if (error.code === "23505") {
      // PostgreSQL unique violation error code
      console.log(
        `[ERROR] Failed to add user: Email/username already registered for ${req.body.email}`
      );
      return res.status(409).json({
        error: "Email or username already registered",
      });
    }

    console.error("[ERROR] Failed to add user:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { username } = req.params;
    const result = await usersModels.deleteUser(username);
    if (!result) {
      console.log(`[ERROR] Failed to delete user: User ${username} not found`);
      return res.status(404).json({
        status: "error",
        message: `User ${username} not found`,
      });
    }

    console.log(
      `User ${username} successfully deleted at ${new Date().toISOString()}`
    );

    res.status(200).json({
      status: "success",
      message: `User ${username} successfully deleted`,
      data: result,
    });
  } catch (error) {
    console.error(`Error while deleting user: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = { getUsers, addUser, getUserByUsername, deleteUser };
