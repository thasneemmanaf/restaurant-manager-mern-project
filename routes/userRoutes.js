const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .post("/signup", authController.signupUser)
  .post("/login", authController.loginUser)
  .get("/login", authController.fetchUser)
  .get("/logout", authController.logoutUser)
  .delete(
    "/:userId",
    authController.authenticateUser,
    authController.deleteUser
  );

module.exports = router;
