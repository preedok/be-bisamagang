const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/users-list", userController.getUsers);
router.post("/add-user", userController.addUser);
router.get("/user/:username", userController.getUserByUsername);
router.delete("/users/:username", userController.deleteUser);

module.exports = router;
