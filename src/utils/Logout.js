import React from 'react';
import { auth } from "../firebase-config";
import { signOut } from 'firebase/auth';


const Logout = () => {

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("isAuth");
      window.location.pathname = "/";
    })
  }
  
  return (
    <div>
      <button className="logoutButton" onClick={signUserOut}>Log Out</button>
    </div>
  )
}

export default Logout;