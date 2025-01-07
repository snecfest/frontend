import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("authToken");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;
