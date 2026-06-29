const express = require("express");

const router = express.Router();

const {
  sendRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/requestController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/send", authMiddleware, sendRequest);
router.get("/", authMiddleware, getRequests);
router.put("/:id/accept", authMiddleware, acceptRequest);
router.put("/:id/reject", authMiddleware, rejectRequest);

module.exports = router;
