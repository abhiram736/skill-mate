import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMe, updateProfile } from "../services/userService";
import { validateProfile } from "../utils/validate";

function Profile() {
  const [name, setName] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        const currentUser = res.data;

        setName(currentUser.name || "");
        setSkillsOffered(currentUser.skillsOffered?.join(", ") || "");
        setSkillsWanted(currentUser.skillsWanted?.join(", ") || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateProfile({ name });
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      const res = await updateProfile({
        name,
        skillsOffered: skillsOffered
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        skillsWanted: skillsWanted
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      setMessage(res.data.message || "Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page">
          <p className="empty-state">Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page-center">
        <form className="form-card" onSubmit={handleSave} style={{ maxWidth: "500px" }}>
          <h1>Profile</h1>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skillsOffered">Skills Offered (comma-separated)</label>
            <input
              id="skillsOffered"
              type="text"
              className="form-input"
              value={skillsOffered}
              onChange={(e) => setSkillsOffered(e.target.value)}
              placeholder="e.g. Java, React"
            />
          </div>

          <div className="form-group">
            <label htmlFor="skillsWanted">Skills Wanted (comma-separated)</label>
            <input
              id="skillsWanted"
              type="text"
              className="form-input"
              value={skillsWanted}
              onChange={(e) => setSkillsWanted(e.target.value)}
              placeholder="e.g. Python, NodeJS"
            />
          </div>

          <button type="submit" className="btn btn-full" disabled={saving}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
