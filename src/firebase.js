// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT5akNIvcfrz2ZopAZSlWhjIxfcB9N0N8",
  authDomain: "guber-fac21.firebaseapp.com",
  databaseURL: "https://guber-fac21-default-rtdb.firebaseio.com",
  projectId: "guber-fac21",
  storageBucket: "guber-fac21.appspot.com",
  messagingSenderId: "75560243207",
  appId: "1:75560243207:web:fc33ce737c692f1d60daa2",
  measurementId: "G-LF6M9C9R8Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;