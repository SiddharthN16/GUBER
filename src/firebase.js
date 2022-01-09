// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvG_Rn7hca8jbt6nqcntCnT75rW-COgks",
  authDomain: "guber-7b4d0.firebaseapp.com",
  databaseURL: "https://guber-7b4d0-default-rtdb.firebaseio.com",
  projectId: "guber-7b4d0",
  storageBucket: "guber-7b4d0.appspot.com",
  messagingSenderId: "973191020027",
  appId: "1:973191020027:web:e81aa030323914c08f5f5e",
  measurementId: "G-6L9M5YPXK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
