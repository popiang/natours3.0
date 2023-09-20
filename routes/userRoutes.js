const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router
    .route("/api/v1/users/")
    .get(userController.getAllUsers)
    .post(userController.createUser);
router
    .route("/api/v1/users/:id")
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;