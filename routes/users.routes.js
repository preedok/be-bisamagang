const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/users-list", userController.getUsers);

module.exports = router;
