import './App.css';
import React from 'react';
import { HashRouter, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/ecoshower/stopwatch" element={<Main />} />
        <Route path="/ecoshower/profile" element={<Profile />} />
        <Route path="/ecoshower/settings" element={<Settings />} />
        <Route path="/ecoshower/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
