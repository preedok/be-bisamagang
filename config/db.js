const { Pool } = require("pg");

require("dotenv").config();

// pool configuration
const poolConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "nama_database_anda",
  password: process.env.DB_PASSWORD || "password_anda",
  port: process.env.DB_PORT || 5433,

  idleTimeoutMillis: 30000, // close connection after 30 seconds idle
  connectionTimeoutMillis: 2000,
  max: 1, // limit 1 connection only
};

// instance pool
const pool = new Pool(poolConfig);

// Function to attempt connection with retry
const connectDB = async (retries = 5) => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");
    client.release();
    return pool;
  } catch (error) {
    console.error("❌ Database connection error:", error);
    if (retries > 0) {
      console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // tunggu 5 detik
      return connectDB(retries - 1);
    }
    throw error;
  }
};

module.exports = {
  pool,
  connectDB,
  query: (text, params) => pool.query(text, params),
};
