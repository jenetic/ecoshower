import React, { useState, useEffect } from 'react';
import { auth } from "../firebase-config";
import { signOut } from 'firebase/auth';


const Logout = () => {
  
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("isAuth");
      setIsAuth(false);
      window.location.pathname = "/ecoshower";
    })
  }
  
  return (
    <div>
      <button className="logoutButton" onClick={signUserOut}>Log Out</button>
    </div>
  )
}

export default Logout;