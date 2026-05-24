import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
