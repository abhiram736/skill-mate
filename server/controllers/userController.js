const User = require("../models/User");

// GET /api/users/me
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, skillsOffered, skillsWanted } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        skillsOffered,
        skillsWanted,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};