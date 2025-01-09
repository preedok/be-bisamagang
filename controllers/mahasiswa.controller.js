const { getAllMahasiswa, addMahasiswa } = require("../models/mahasiswa.model");

const getAllMahasiswaController = async (req, res) => {
  try {
    const mahasiswa = await getAllMahasiswa();
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMahasiswaController = async (req, res) => {
  try {
    const mahasiswa = await addMahasiswa(req.body);
    console.log("Mahasiswa added successfully");
    res.status(201).json(mahasiswa);
  } catch (error) {
    console.log("Error Adding Mahasiswa", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllMahasiswaController, addMahasiswaController };
