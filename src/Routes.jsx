import React from "react";
import { Routes, Route } from "react-router-dom";
import SuccessPage from "./components/SuccessPage";
import Experience from "./components/Experience";
import App from "./App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/successPage" element={<SuccessPage />} />
    </Routes>
  );
}
