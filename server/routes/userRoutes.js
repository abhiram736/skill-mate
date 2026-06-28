const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/profile", authMiddleware, updateProfile);

module.exports = router;