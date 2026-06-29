import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/token";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SkillMate
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Browse Users</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/requests">Requests</Link>
            <button className="btn btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
