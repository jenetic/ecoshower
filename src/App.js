import './App.css';
import React from 'react';
import { HashRouter, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/stopwatch" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
