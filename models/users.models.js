const pool = require("../config/db");

const getAllUser = async () => {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
};

module.exports = { getAllUser };
