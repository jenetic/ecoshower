import './App.css';
import React, { useState, useEffect,  } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { signOut } from 'firebase/auth';
import { auth } from "./firebase-config"

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/stopwatch" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
