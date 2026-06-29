import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { setToken } from "../utils/token";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login page loaded");
  }, []);

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      setToken(res.data.token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}