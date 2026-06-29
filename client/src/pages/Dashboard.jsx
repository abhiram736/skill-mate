import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [skillOffered, setSkillOffered] = useState("");
  const [skillRequested, setSkillRequested] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendRequest = async (receiverId) => {
    if (!skillOffered || !skillRequested) {
      alert("Please enter both skills");
      return;
    }

    try {
      await API.post("/requests/send", {
        sender: currentUser._id,
        receiver: receiverId,
        skillOffered,
        skillRequested,
      });

      alert("Request Sent Successfully");

      setSkillOffered("");
      setSkillRequested("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send request"
      );
    }
  };

  if (!currentUser) {
    return <h2>Please Login First</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <h3>Available Users</h3>

      {users
        .filter((user) => user._id !== currentUser._id)
        .map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h4>{user.name}</h4>

            <p>Email: {user.email}</p>

            <p>
              Skills Offered:
              {user.skillsOffered?.length
                ? user.skillsOffered.join(", ")
                : " None"}
            </p>

            <p>
              Skills Wanted:
              {user.skillsWanted?.length
                ? user.skillsWanted.join(", ")
                : " None"}
            </p>

            <input
              type="text"
              placeholder="Skill You Offer"
              value={skillOffered}
              onChange={(e) =>
                setSkillOffered(e.target.value)
              }
            />

            <br />
            <br />

            <input
              type="text"
              placeholder="Skill You Want"
              value={skillRequested}
              onChange={(e) =>
                setSkillRequested(e.target.value)
              }
            />

            <br />
            <br />

            <button
              onClick={() =>
                sendRequest(user._id)
              }
            >
              Send Request
            </button>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;