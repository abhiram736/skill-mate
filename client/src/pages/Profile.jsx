import { useState } from "react";
import API from "../services/api";

function Profile() {
  const [name, setName] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/users/profile", {
        name,
        skillsOffered: skillsOffered
          .split(",")
          .map((skill) => skill.trim()),
        skillsWanted: skillsWanted
          .split(",")
          .map((skill) => skill.trim()),
      });

      alert("Profile Updated");
    } catch (err) {
      alert("Update Failed");
    }
  };

  return (
    <div>
      <h2>Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Skills Offered (comma separated)"
          value={skillsOffered}
          onChange={(e) => setSkillsOffered(e.target.value)}
        />

        <input
          placeholder="Skills Wanted (comma separated)"
          value={skillsWanted}
          onChange={(e) => setSkillsWanted(e.target.value)}
        />

        <button type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;