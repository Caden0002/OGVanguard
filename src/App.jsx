import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { FeelingLuckyPage } from "./pages/FeelingLuckyPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const GA_MEASUREMENT_ID = "G-Z8B07Y0JM4";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feelinglucky" element={<FeelingLuckyPage />} />
    </Routes>
  );
}
