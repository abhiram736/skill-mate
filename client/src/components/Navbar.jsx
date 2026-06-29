import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        backgroundColor: "#242424",
      }}
    >
      <h2>SkillMate </h2>

      <div>
        <Link
          to="/"
          style={{ marginRight: "20px", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={{ marginRight: "20px", textDecoration: "none" }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{ textDecoration: "none" }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;