const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test koneksi database
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Database connected successfully");
  }
});

module.exports = pool;
