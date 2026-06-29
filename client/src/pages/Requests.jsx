import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUsers } from "../services/userService";
import {
  getRequests,
  sendRequest,
  acceptRequest,
  rejectRequest,
} from "../services/requestService";
import { getUserIdFromToken } from "../utils/token";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [skillOffered, setSkillOffered] = useState("");
  const [skillRequested, setSkillRequested] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const userId = getUserIdFromToken();
      setCurrentUserId(userId);

      const [requestsRes, usersRes] = await Promise.all([
        getRequests(),
        getUsers(),
      ]);

      setRequests(requestsRes.data.requests);
      setUsers(usersRes.data.filter((u) => u._id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!receiverId || !skillOffered.trim() || !skillRequested.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await sendRequest({
        receiver: receiverId,
        skillOffered: skillOffered.trim(),
        skillRequested: skillRequested.trim(),
      });
      setMessage("Request sent successfully");
      setReceiverId("");
      setSkillOffered("");
      setSkillRequested("");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send request");
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptRequest(id);
      setMessage("Request accepted");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      setMessage("Request rejected");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject request");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page">
          <p className="empty-state">Loading requests...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Requests</h1>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <form className="user-card" onSubmit={handleSend}>
          <h3>Send a Request</h3>

          <div className="form-group">
            <label htmlFor="receiver">Select User</label>
            <select
              id="receiver"
              className="form-select"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="skillOffered">Skill You Offer</label>
            <input
              id="skillOffered"
              type="text"
              className="form-input"
              placeholder="e.g. React"
              value={skillOffered}
              onChange={(e) => setSkillOffered(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skillRequested">Skill You Want to Learn</label>
            <input
              id="skillRequested"
              type="text"
              className="form-input"
              placeholder="e.g. Python"
              value={skillRequested}
              onChange={(e) => setSkillRequested(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Send Request
          </button>
        </form>

        <h3 style={{ marginTop: "32px" }}>Your Requests</h3>

        {requests.length === 0 ? (
          <p className="empty-state">No requests yet.</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="request-card">
              <p>
                <strong>{req.sender.name}</strong> offers{" "}
                <strong>{req.skillOffered}</strong> to{" "}
                <strong>{req.receiver.name}</strong> for{" "}
                <strong>{req.skillRequested}</strong>
              </p>
              <p>
                Status:{" "}
                <span className="skill-tag">{req.status}</span>
              </p>

              {req.status === "Pending" && req.receiver._id === currentUserId && (
                <div style={{ marginTop: "12px" }}>
                  <button className="btn btn-sm" onClick={() => handleAccept(req._id)}>
                    Accept
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleReject(req._id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Requests;
