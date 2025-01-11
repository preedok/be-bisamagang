const pool = require("../config/db");

const getAllMahasiswa = async () => {
  const mahasiswa = await pool.query("SELECT * FROM mahasiswa");
  return mahasiswa.rows;
};

const getMahasiswaByNim = async (nim) => {
  const getMahasiswa = await pool.query(
    "SELECT * FROM mahasiswa where nim = $1",
    [nim]
  );
  return getMahasiswa.rows[0];
};

const addMahasiswa = async (mahasiswa) => {
  const newMahasiswa = await pool.query(
    "INSERT INTO mahasiswa (nim, nama, jurusan, semester) VALUES ($1, $2, $3, $4) RETURNING *",
    [mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, mahasiswa.semester]
  );
  return newMahasiswa.rows[0];
};

const deleteMahasiswa = async (nim) => {
  const deleteMahasiswa = await pool.query(
    "DELETE FROM mahasiswa where nim = $1",
    [nim]
  );
  return deleteMahasiswa.rows[0];
};

module.exports = {
  getAllMahasiswa,
  getMahasiswaByNim,
  addMahasiswa,
  deleteMahasiswa,
};
