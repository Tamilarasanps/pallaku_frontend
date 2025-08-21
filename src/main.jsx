import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TripContextProvider } from "./Contexts/TripType.jsx";
import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter
import AppRoutes from "./Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TripContextProvider>
        <AppRoutes />
      </TripContextProvider>
    </BrowserRouter>
  </StrictMode>
);
