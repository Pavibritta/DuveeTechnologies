import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("role");

  // ❌ Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // ❌ Role mismatch (admin / employee)
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;