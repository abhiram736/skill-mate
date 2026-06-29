import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/token";

function Home() {
  const isLoggedIn = !!getToken();

  return (
    <div>
      <Navbar />

      <section className="hero-section">
        <h1>Welcome to SkillMate</h1>
        <p>Exchange skills and learn together with people in your community.</p>

        <div className="hero-actions">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="btn">
                Go to Dashboard
              </Link>
              <Link to="/users" className="btn">
                Browse Users
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn">
                Get Started
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
