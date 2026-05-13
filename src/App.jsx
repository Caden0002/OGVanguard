import { Route, Routes } from "react-router-dom";
import { FeelingLuckyPage } from "./pages/FeelingLuckyPage.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feelinglucky" element={<FeelingLuckyPage />} />
    </Routes>
  );
}
