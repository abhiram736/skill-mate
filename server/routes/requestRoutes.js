const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  sendRequest,
  getReceivedRequests,
  getSentRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

// All routes are protected
router.post("/", auth, sendRequest);
router.get("/received", auth, getReceivedRequests);
router.get("/sent", auth, getSentRequests);
router.put("/:id", auth, updateRequestStatus);

module.exports = router;