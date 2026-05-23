import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { FeelingLuckyPage } from "./pages/FeelingLuckyPage.jsx";
import { GalleryPage } from "./pages/GalleryPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const GA_MEASUREMENT_ID = "G-Z8B07Y0JM4";

export default function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search, location.hash]);

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
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  );
}
