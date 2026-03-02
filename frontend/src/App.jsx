import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./LandingPage";
import ActivitiesPage from "./components/ActivitiesPage";
import { Route, Routes } from "react-router-dom";
import DetailedActivity from "./components/DetailedActivity";
import InventoryPage from "./components/InventoryPage";
import NewsPaper from "./components/NewsPaper";
import Auth from "./components/Auth";
import Account from "./components/Account";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<DetailedActivity />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/news-paper/:id" element={<NewsPaper />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;