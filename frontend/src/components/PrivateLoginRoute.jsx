import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateLoginRoute = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  if (accessToken) {
    return <Navigate to="/protected" replace />;
  }

  return children;
};

export default PrivateLoginRoute;
