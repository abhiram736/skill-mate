<<<<<<< HEAD
import { useEffect } from "react";

export default function Requests() {
  useEffect(() => {
    console.log("Requests page loaded");
  }, []);

  return (
    <div>
      <h1>Requests</h1>
      <p>Skill exchange requests will appear here (Member 3 API)</p>
=======
import { useEffect, useState } from "react";
import API from "../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequests(res.data.requests);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptRequest = async (id) => {
    await API.put(`/requests/${id}/accept`);
    loadRequests();
  };

  const rejectRequest = async (id) => {
    await API.put(`/requests/${id}/reject`);
    loadRequests();
  };

  return (
    <div>
      <h2>Skill Requests</h2>

      {requests.map((request) => (
        <div
          key={request._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
          }}
        >
          <p>
            Sender:
            {request.sender?.name}
          </p>

          <p>
            Receiver:
            {request.receiver?.name}
          </p>

          <p>
            Status:
            {request.status}
          </p>

          <p>
            Skill Offered:
            {request.skillOffered}
          </p>

          <p>
            Skill Requested:
            {request.skillRequested}
          </p>

          {request.status === "Pending" && (
            <>
              <button
                onClick={() =>
                  acceptRequest(request._id)
                }
              >
                Accept
              </button>

              <button
                onClick={() =>
                  rejectRequest(request._id)
                }
              >
                Reject
              </button>
            </>
          )}
        </div>
      ))}
>>>>>>> 332d848 (Frontend and request feature updates)
    </div>
  );
}