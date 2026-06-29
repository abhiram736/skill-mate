const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getCurrentUser);
router.get("/", getUsers);

router.put("/profile", authMiddleware, updateProfile);
router.get("/:id", getUserById);

module.exports = router;