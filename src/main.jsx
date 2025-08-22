import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TripContextProvider } from "./Contexts/TripType.jsx";
import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter
import AppRoutes from "./Routes.jsx";
import { MorphingLoader } from "./Loader.jsx";
import { useState } from "react";
import { useEffect } from "react";

function MainApp() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <BrowserRouter>
      <TripContextProvider>
        {loader ? <MorphingLoader /> : <AppRoutes />}
      </TripContextProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
