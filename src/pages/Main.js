import React from 'react';
import Stopwatch from "../utils/Stopwatch";
import Logout from "../utils/Logout";
import { Link } from "react-router-dom";


const Main = () => {

  return (
    <div>
      <Logout></Logout>
      <div className="bottomButtons">
        <Link className="linkButton" to="/profile" style={{ textDecoration: 'none' }}>Previous Showers</Link>
        <Link className="linkButton" to="/settings" style={{ textDecoration: 'none' }}>Settings</Link>
      </div>
      <Stopwatch></Stopwatch>
    </div>
  )
}

export default Main;