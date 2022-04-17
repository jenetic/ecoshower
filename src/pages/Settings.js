import { setDoc, getDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../App.css"
import { useNavigate } from 'react-router-dom';
import Logout from "../utils/Logout";

const Settings = () => {
  
  let navigate = useNavigate();
  
  const auth = getAuth();
  
  // Get user settings data when page loads
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Retrieve data from user when page loads and put in textboxes

        const getSettings = async () => {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            document.getElementById("goalTime").value = docSnap.data().goal;
            document.getElementById("reminder1").value = docSnap.data().reminder1;
            document.getElementById("reminder1Time").value = docSnap.data().reminder1Time;
            document.getElementById("reminder2").value = docSnap.data().reminder2;
            document.getElementById("reminder2Time").value = docSnap.data().reminder2Time;
          }
        }
        getSettings();
      }
    });
  }, [])
  
  const updateSettings = async () => {
    const settingRef = doc(db, "users", auth.currentUser.uid);
    
    // Update info to database
    await setDoc((settingRef), {
      goal: document.getElementById("goalTime").value,
      reminder1: document.getElementById("reminder1").value,
      reminder1Time: document.getElementById("reminder1Time").value,
      reminder2: document.getElementById("reminder2").value,
      reminder2Time: document.getElementById("reminder2Time").value,
    });
    navigate("ecoshower/stopwatch");
  }

  return (
    <div>
      <Logout></Logout>
      <div className="settings">
        <h1>Settings</h1>
        <h2>Shower Goal</h2>
        <p>A text-to-speech bot will remind you when the stopwatch hits the specified time.</p>
        <p>Under <span><input className="numInput" id="goalTime"></input></span> Minutes</p>
        
        <h2>Reminders</h2>
        <p>A text-to-speech bot will read your message out loud at the specified time.</p>
        <div className="reminderInput">
          <h3>Reminder 1 Message</h3>
          <input id="reminder1" placeholder="Put on shampoo" className="textInput"></input>
          <p>Remind me at <span><input id="reminder1Time" className="numInput"></input></span> minutes.</p>
        </div>
        <div className="reminderInput">
          <h3>Reminder 2 Message</h3>
          <input id="reminder2" placeholder="Put on conditioner" className="textInput"></input>
          <p>Remind me at <span><input id="reminder2Time" className="numInput"></input></span> minutes.</p>
        </div>
        <button className="midButtons" onClick={() => updateSettings()}>Save</button>
      </div>
    </div>
  )
}

export default Settings;