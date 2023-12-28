import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function Root() {
  return (
    <Router>
      <div className="container">
        <AppRoutes />
      </div>
    </Router>
  );
}
