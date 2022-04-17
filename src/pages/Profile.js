import React, { useState, useEffect } from 'react';
import { db } from "../firebase-config";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import "../App.css";
import { getMins, getSecs, getGallons, getCo2Emissions, getWaterBill } from "../utils/Calculations";
import Logout from "../utils/Logout";

const Profile = () => {

  const [showersList, setShowersList] = useState([]);
  const [userUid, setUserUid] = useState("");
  
  const auth = getAuth();
  
  // Get user shower data when page loads
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);

        const getShowers = async () => {
          const showersRef = collection(db, "users", user.uid, "showers");
          const data = await getDocs(showersRef);
          setShowersList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getShowers();
      }
    });
  }, [])

  // Sort showers list by time created
  showersList.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    } else {
      return 1;
    }
  })
  
  // Delete shower entry
  const handleDelete = async (id) => {
    // Hide div
    document.getElementById(id).style.display = "none";

    // Delete shower entry
    const showersRef = collection(db, "users", userUid, "showers");
    await deleteDoc(doc(showersRef, id));
  }

  return (
    <div>
      <Logout></Logout>
      <Link to="ecoshower/stopwatch" className="linkButton" id="stopwatchButton" style={{ textDecoration: 'none' }}>Shower Tracker</Link>
      <p className="tableMsg">Try to get under your previous time!</p>
      <table>
        <tr>
          <td className="header">Date</td>
          <td className="header">Duration</td>
          <td className="header">Water (Gallons)</td>
          <td className="header">CO2 Emissions (lbs)</td>
          <td className="header">Average Water Bill Cost</td>
          
        </tr>
        {showersList.map((shower) => {
          return (
            <tr key={shower.id} id={shower.id}>
              <td>{new Date(parseInt(shower.created)).toLocaleDateString()}</td>
              <td>{getMins(shower.time)}:{getSecs(shower.time)} </td>
              <td>{getGallons(shower.time)}</td>
              <td>{getCo2Emissions(shower.time)}</td>
              <td>${getWaterBill(shower.time)}</td>
              <td><button className="deleteButton" onClick={() => handleDelete(shower.id)}> X </button></td>
            </tr>)
        })}
      </table>
      
  
    
    </div>
  )
}

export default Profile;