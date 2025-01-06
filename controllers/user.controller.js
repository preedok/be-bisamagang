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

module.exports = { getUsers };
