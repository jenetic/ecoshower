// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqvuEDHR3GnLdCGfPVAGUQmR5dHftd7-Y",
  authDomain: "shower-timer-86521.firebaseapp.com",
  projectId: "shower-timer-86521",
  storageBucket: "shower-timer-86521.appspot.com",
  messagingSenderId: "117085169378",
  appId: "1:117085169378:web:7dee6606e1e1de941c20bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
