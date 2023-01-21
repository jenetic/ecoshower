import "../App.css"
import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useSpeechSynthesis } from 'react-speech-kit';
import { onAuthStateChanged } from "firebase/auth";
import { getMins, getSecs, getGallons, getCo2Emissions, getWaterBill } from "./Calculations";

const Stopwatch = () => {
  
  const { speak } = useSpeechSynthesis();
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [finishedTime, setFinishedTime] = useState(0);
  const [goal, setGoal] = useState(0);
  const [reminder1, setReminder1] = useState(null);
  const [reminder1Time, setReminder1Time] = useState(null);
  const [reminder2, setReminder2] = useState(null);
  const [reminder2Time, setReminder2Time] = useState(null);

  const getTimeEpoch = () => {
    return new Date().getTime().toString();                             
  }

  // Retrieve data from user when page loads and put in textboxes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getTimes = async () => {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setGoal(docSnap.data().goal);
            setReminder1(docSnap.data().reminder1);
            setReminder1Time(docSnap.data().reminder1Time);
            setReminder2(docSnap.data().reminder2);
            setReminder2Time(docSnap.data().reminder2Time);
          }
        }
        getTimes();
      }
    });
  }, [])

  let timestamps = [];
  let timeoutGoal = null;
  let timeoutReminder1 = null;
  let timeoutReminder2 = null;
  let timeoutIds = [timeoutGoal, timeoutReminder1, timeoutReminder2];

  // Check if the stuff in settings are numbers, if so, add to timestamps for it to read out loud
  if (!(goal === "" || goal < 0 || !(!isNaN(goal) && !isNaN(parseFloat(goal))))) {
    timestamps.push({
      time: goal*60000,
      message: `It has been ${goal} minutes`
    });
  }

  if (!(reminder1Time === "" || reminder1Time < 0 || !(!isNaN(reminder1Time) && !isNaN(parseFloat(reminder1Time))))) {
    timestamps.push({
      time: reminder1Time*60000,
      message: reminder1
    });
  }

  if (!(reminder2Time === "" || reminder2Time < 0 || !(!isNaN(reminder2Time) && !isNaN(parseFloat(reminder2Time))))) {
    timestamps.push({
      time: reminder2Time*60000,
      message: reminder2
    });
  }

  // Make timer go up
  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)

      for (let i = 0; i < timestamps.length; i++) {
        timeoutIds[i] = setTimeout(() => {
          speak({text: timestamps[i].message})
        }, timestamps[i].time);
      }
    } else {
      for (let i = 0; i < timestamps.length; i++) {
        clearTimeout(timeoutIds[i]);
      }
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [start])


  const handleStart = () => {
    setTime(0);
    setStart(true);
    document.getElementById("stats").style.display = "none";    
  }

  const handleFinish = async () => {
    // Add shower duration to database after user presses "Finish"
    const showerRef = doc(db, "users", auth.currentUser.uid, "showers", auth.currentUser.uid + getTimeEpoch());
    await setDoc(showerRef, {
      time,
      created: getTimeEpoch()
    });

    // Display stats
    setFinishedTime(time);
    document.getElementById("stats").style.display = "flex";

    // Reset stopwatch
    setStart(false);
  }

  return (
    <div className="watch">
      <div>
        <div className="watchAndButtons">
          <h1 className="watchNumbers">
            <span>{getMins(time)}:</span>
            <span>{getSecs(time)}</span>
          </h1>
          <div className="buttons">
            <button className="midButtons" onClick={() => handleStart()}>Start Shower</button>
            <button className="midButtons" onClick={() => handleFinish()}>Finished Shower</button>
            <button className="midButtons" onClick={() => {setTime(0); setStart(false);}}>Cancel Shower</button>
          </div>
        </div>
      </div>
      <br/>
      <div id="stats">
          <div className="statsContents">
            <b>Shower Duration:</b> {getMins(finishedTime)}:{getSecs(finishedTime)}
            <br/>
            <b>Water:</b> {getGallons(finishedTime)} gallons
            <br/>
            <b>CO2 Emissions*:</b> {getCo2Emissions(finishedTime)} lbs
            <br/>
            <b>Water bill cost:</b> ${getWaterBill(finishedTime)}
            <p>
              *for hot water
              <br/>
              Note: Values are based on averages and estimates. 
            </p>
          </div>
      </div>
    </div>
  )
}

export default Stopwatch;