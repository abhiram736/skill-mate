const express = require("express");

const router = express.Router();

const {
  sendRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/requestController");

// Send Request
router.post("/send", sendRequest);

// View Requests
router.get("/", getRequests);

// Accept Request
router.put("/:id/accept", acceptRequest);

// Reject Request
router.put("/:id/reject", rejectRequest);

module.exports = router;