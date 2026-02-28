import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./LandingPage";
import ActivitiesPage from "./components/ActivitiesPage";
import { Route, Routes } from "react-router-dom";
import DetailedActivity from "./components/DetailedActivity";
import InventoryPage from "./components/InventoryPage";
import NewsPaper from "./components/NewsPaper";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<DetailedActivity />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/news-paper" element={<NewsPaper />} />
      </Routes>
    </div>
  );
}

export default App;
