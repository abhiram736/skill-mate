const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getUsers);

router.put("/profile", authMiddleware, updateProfile);
router.get("/:id", getUserById);

module.exports = router;