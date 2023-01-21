import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/stopwatch" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
