import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextPanel } from "../utils/ContextPanel";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const { isPanelUp } = useContext(ContextPanel);

  if (!token || !isPanelUp?.success) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
