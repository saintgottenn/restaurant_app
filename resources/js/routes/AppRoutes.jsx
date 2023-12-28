import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "../components/auth/Auth";
import HomePage from "../components/Home";
import AuthProtectedRoute from "../routes/AuthProtectedRoute";
import GuestProtectedRoute from "../routes/GuestProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthProtectedRoute>
            <HomePage />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <GuestProtectedRoute>
            <AuthPage />
          </GuestProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
