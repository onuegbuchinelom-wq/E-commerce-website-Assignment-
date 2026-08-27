import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
