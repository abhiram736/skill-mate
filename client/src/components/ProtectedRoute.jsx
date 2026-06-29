import { Navigate } from "react-router-dom";
<<<<<<< HEAD
import { getToken } from "../utils/token";

export default function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}
=======

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
>>>>>>> 332d848 (Frontend and request feature updates)
