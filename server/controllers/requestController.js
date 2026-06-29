const Request = require("../models/Request");

// Send Request
exports.sendRequest = async (req, res) => {
  try {
    const { sender, receiver, skillOffered, skillRequested } = req.body;

if (
  !sender ||
  !receiver ||
  !skillOffered ||
  !skillRequested
) {
  return res.status(400).json({
    message: "All fields are required",
  });
}

    if (sender === receiver) {
      return res.status(400).json({
        message: "You cannot send a request to yourself",
      });
    }

    const existingRequest = await Request.findOne({
      sender,
      receiver,
      status: "Pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    const request = await Request.create({
  sender,
  receiver,
  skillOffered,
  skillRequested,
});

    res.status(201).json({
      success: true,
      message: "Request Sent Successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Accept Request
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Accepted";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Request Accepted",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Rejected";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Request Rejected",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};