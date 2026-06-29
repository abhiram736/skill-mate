import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser, loginUser } from "../services/authService";
import { setToken } from "../utils/token";
import { validateRegister } from "../utils/validate";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateRegister({ name, email, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await registerUser({ name, email, password });
      const res = await loginUser({ email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-center">
        <form className="form-card" onSubmit={handleRegister}>
          <h1>Register</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={{ marginTop: "16px", textAlign: "center", fontSize: "14px" }}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
