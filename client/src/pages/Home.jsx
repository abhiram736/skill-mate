import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>SkillMate</h1>

      <p>Exchange skills and learn from others.</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;