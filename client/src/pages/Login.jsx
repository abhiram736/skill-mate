import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUser } from "../services/authService";
import { setToken } from "../utils/token";
import { validateLogin } from "../utils/validate";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateLogin({ email, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-center">
        <form className="form-card" onSubmit={handleLogin}>
          <h1>Login</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ marginTop: "16px", textAlign: "center", fontSize: "14px" }}>
            No account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
