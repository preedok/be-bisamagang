const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersModels = require("../models/users.models");
const { pool } = require("../config/db");

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await usersModels.getAllUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
