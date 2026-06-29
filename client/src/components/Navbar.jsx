import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>{" "}
      <Link to="/profile">Profile</Link>{" "}
      <Link to="/requests">Requests</Link>{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;