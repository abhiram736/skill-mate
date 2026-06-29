import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUsers } from "../services/userService";
import { getUserIdFromToken } from "../utils/token";

function SkillList({ skills, emptyText }) {
  if (!skills?.length) {
    return <p className="empty-state">{emptyText}</p>;
  }

  return (
    <div className="skill-tags">
      {skills.map((skill) => (
        <span key={skill} className="skill-tag">
          {skill}
        </span>
      ))}
    </div>
  );
}

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUserId = getUserIdFromToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data.filter((u) => u._id !== currentUserId));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Browse Users</h1>
        <p>Discover people and their skills. View a profile to learn more.</p>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <p className="empty-state">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="empty-state">No other users registered yet.</p>
        ) : (
          <div className="card-grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>

                <h4>Offers</h4>
                <SkillList skills={user.skillsOffered} emptyText="No skills listed" />

                <h4>Wants</h4>
                <SkillList skills={user.skillsWanted} emptyText="No skills listed" />

                <Link to={`/users/${user._id}`} className="btn btn-sm" style={{ marginTop: "16px", display: "inline-block" }}>
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default BrowseUsers;
