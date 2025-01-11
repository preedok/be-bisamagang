const pool = require("../config/db");

const getAllUser = async () => {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
};

const getUserByUsername = async (username) => {
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return user.rows[0];
};

const addUser = async (user) => {
  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, fullname, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        user.username,
        user.email,
        user.password,
        user.fullname,
        user.role || "user",
      ]
    );

    if (newUser.rows.length === 0) {
      throw new Error("Gagal menambahkan user");
    }

    return newUser.rows[0];
  } catch (error) {
    throw new Error(`Error saat menambahkan user: ${error.message}`);
  }
};

const deleteUser = async (username) => {
  const deletedUser = await pool.query(
    "DELETE FROM users WHERE username = $1",
    [username]
  );
  return deletedUser.rows[0];
};

module.exports = { getAllUser, getUserByUsername, addUser, deleteUser };
