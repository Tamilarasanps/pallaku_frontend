import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TripContextProvider } from "./Contexts/TripType.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TripContextProvider>
      <App />
    </TripContextProvider>
  </StrictMode>
);
