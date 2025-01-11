const mahasiswaModels = require("../models/mahasiswa.model");

async function getAllMahasiswa(req, res) {
  try {
    const mahasiswas = await mahasiswaModels.getAllMahasiswa();
    res.status(200).json(mahasiswas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get mahasiswa by nim
async function getMahasiswaByNim(req, res) {
  const { nim } = req.params;
  const mahasiswa = await mahasiswaModels.getMahasiswaByNim(nim);
  res.status(200).json(mahasiswa);
}

//add mahasiswa
async function addMahasiswa(req, res) {
  try {
    const mahasiswa = await mahasiswaModels.addMahasiswa(req.body);
    console.log("Mahasiswa added successfully");
    res.status(201).json(mahasiswa);
  } catch (error) {
    console.log("Error Adding Mahasiswa", error.message);
    res.status(500).json({ message: error.message });
  }
}

//delete mahasiswa
async function deleteMahasiswa(req, res) {
  try {
    const { nim } = req.params;

    // Validasi nim
    if (!nim || nim.trim() === "") {
      console.error("[ERROR] Delete mahasiswa failed: nim is empty");
      return res.status(400).json({
        status: "error",
        message: "nim is required",
      });
    }

    // Cek apakah mahasiswa exists sebelum delete
    const existingMahasiswa = await mahasiswaModels.getMahasiswaByNim(nim);
    if (!existingMahasiswa) {
      console.error(`[ERROR] Delete user failed: Mahasiswa ${nim} not found`);
      return res.status(404).json({
        status: "error",
        message: `User ${nim} not found`,
      });
    }

    try {
      await mahasiswaModels.deleteMahasiswa(nim);

      console.log(
        `[SUCCESS] Mahasiswa ${nim} successfully deleted at ${new Date().toISOString()}`
      );
      return res.status(200).json({
        status: "success",
        message: `Mahasiswa ${nim} successfully deleted`,
        data: existingMahasiswa,
      });
    } catch (dbError) {
      console.error(
        `[ERROR] Database error while deleting mahasiswa ${nim}: ${dbError.message}`
      );
      return res.status(500).json({
        status: "error",
        message: "Failed to delete mahasiswa due to database error",
      });
    }
  } catch (error) {
    console.error(`[ERROR] Delete mahasiswa error: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

module.exports = {
  getAllMahasiswa,
  getMahasiswaByNim,
  addMahasiswa,
  deleteMahasiswa,
};
