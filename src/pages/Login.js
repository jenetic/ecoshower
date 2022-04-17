import React, { useState, useEffect } from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  let navigate = useNavigate();
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      navigate("/stopwatch");
    })
  };
  
  return (
    <div className="loginPage">
      <div className="loginPage2">
        <h1 className="title">Eco<span className="shower">Shower</span></h1>
        <p>
          Taking long showers is harmful for the environment because it wastes water, consumes lots of energy, and contributes to greenhouse gas emissions and climate change.
        </p>
        <p>
          EcoShower is a shower time tracker aimed at promoting shorter showers, sustainability, and environmental awareness through custom reminders and by tracking how long your showers are, the gallons of water used, carbon dioxide emissions released, and the average cost of your shower.
        </p>
        <br/>
        <button className="midButtons" onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    
    </div>
  )
}

export default Login;