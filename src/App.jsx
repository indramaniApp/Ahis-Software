// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Pharmacy from "./pages/Pharmacy";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pharmacy" element={<Pharmacy />} />

      </Routes>
    </Router>
  );
}

export default App;
