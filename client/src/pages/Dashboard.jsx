import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMe } from "../services/userService";
import { getRequests } from "../services/requestService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, requestsRes] = await Promise.all([
          getMe(),
          getRequests(),
        ]);

        setUser(userRes.data);

        const pending = requestsRes.data.requests.filter(
          (r) => r.status === "Pending"
        );
        setPendingCount(pending.length);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="page">
          <div className="alert alert-error">{error}</div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="page">
          <p className="empty-state">Loading dashboard...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Dashboard</h1>
        <p>Welcome back, {user.name}!</p>

        <div className="stat-grid">
          <div className="stat-card">
            <h3>Skills Offered</h3>
            <p>{user.skillsOffered?.length || 0}</p>
          </div>

          <div className="stat-card">
            <h3>Skills Wanted</h3>
            <p>{user.skillsWanted?.length || 0}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Requests</h3>
            <p>{pendingCount}</p>
          </div>
        </div>

        <div className="user-card" style={{ marginTop: "24px" }}>
          <h3>Your Skills</h3>
          <h4>Offers</h4>
          <p>{user.skillsOffered?.length ? user.skillsOffered.join(", ") : "None yet — update your profile"}</p>
          <h4>Wants</h4>
          <p>{user.skillsWanted?.length ? user.skillsWanted.join(", ") : "None yet — update your profile"}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
