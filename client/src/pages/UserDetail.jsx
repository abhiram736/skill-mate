import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUser } from "../services/userService";

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

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(id);
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="page">
        <Link to="/users" className="btn btn-sm">
          ← Back to Browse
        </Link>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <p className="empty-state">Loading profile...</p>
        ) : user ? (
          <div className="user-card" style={{ marginTop: "20px", maxWidth: "600px" }}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>

            <h3>Skills Offered</h3>
            <SkillList skills={user.skillsOffered} emptyText="No skills offered yet" />

            <h3>Skills Wanted</h3>
            <SkillList skills={user.skillsWanted} emptyText="No skills wanted yet" />

            <Link to="/requests" className="btn" style={{ marginTop: "24px", display: "inline-block" }}>
              Send a Request
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UserDetail;
