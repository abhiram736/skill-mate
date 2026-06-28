const Request = require("../models/Request");

// Send a skill exchange request
exports.sendRequest = async (req, res) => {
  try {
    const { receiverId, skillOffered, skillRequested } = req.body;

    if (req.user.id === receiverId) {
      return res
        .status(400)
        .json({ message: "You cannot send a request to yourself" });
    }

    const request = await Request.create({
      sender: req.user.id,
      receiver: receiverId,
      skillOffered,
      skillRequested,
    });

    res.status(201).json({ message: "Request sent successfully", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all requests received by the logged-in user
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user.id }).populate(
      "sender",
      "name email skillsOffered"
    );

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all requests sent by the logged-in user
exports.getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user.id }).populate(
      "receiver",
      "name email skillsOffered"
    );

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept or reject a request
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: `Request ${status}`, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};