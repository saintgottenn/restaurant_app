import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Компонент для защиты маршрутов
const AuthProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default AuthProtectedRoute;
