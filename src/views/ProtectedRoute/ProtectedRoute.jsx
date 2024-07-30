// src/views/ProtectedRoute/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching the user
  }

  if (!user) {
    // If there is no user, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.Role)) {
    // If the user role is not allowed, redirect to the home page
    return <Navigate to="/" replace />;
  }

  // Render the children if the user is authenticated and has the correct role
  return children;
};

export default ProtectedRoute;
