const express = require("express");
const authController = require("../controllers/authControllers");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route for user registration
router.post("/register", validateRegistration, authController.register);

// Route for user login
router.post("/login", validateLogin, authController.login);

// route for current user

router.get(
  "/current-user",
  authMiddleware,
  authController.currentUserController
);

// Add more authentication-related routes as needed

module.exports = router;
