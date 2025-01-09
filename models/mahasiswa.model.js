const pool = require("../config/db");

const getAllMahasiswa = async () => {
  const mahasiswa = await pool.query("SELECT * FROM mahasiswa");
  return mahasiswa.rows;
};

const addMahasiswa = async (mahasiswa) => {
  const newMahasiswa = await pool.query(
    "INSERT INTO mahasiswa (nim, nama, jurusan, semester) VALUES ($1, $2, $3, $4) RETURNING *",
    [mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, mahasiswa.semester]
  );
  return newMahasiswa.rows[0];
};

module.exports = { getAllMahasiswa, addMahasiswa };
