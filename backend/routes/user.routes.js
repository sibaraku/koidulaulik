const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/new-user", userController.createUser);
router.post("/login", userController.getUser);
router.get("/me", userController.getMe);

module.exports = router;
