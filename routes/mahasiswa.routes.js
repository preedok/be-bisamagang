const router = require("express").Router();
const mahasiswaController = require("../controllers/mahasiswa.controller");

router.get("/list-mahasiswa", mahasiswaController.getAllMahasiswa);
router.post("/add-mahasiswa", mahasiswaController.addMahasiswa);
router.get("/get-mahasiswa/:nim", mahasiswaController.getMahasiswaByNim);
router.delete("/delete-mahasiswa/:nim", mahasiswaController.deleteMahasiswa);
module.exports = router;
