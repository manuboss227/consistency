import React, {
  useContext
} from "react";

import {
  Navigate
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

function ProtectedRoute({
  children
}) {

  const {
    user,
    loading
  } = useContext(
    AuthContext
  );

  // Wait for auth check
  if (loading) {

    return <p>Loading...</p>;
  }

  // Not logged in
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Logged in
  return children;
}

export default ProtectedRoute;