// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCV7bOj3QAjvKmwOpuIp9rm6ZwacpOy9vQ",
  authDomain: "carbon-tracker-4937b.firebaseapp.com",
  projectId: "carbon-tracker-4937b",
  storageBucket: "carbon-tracker-4937b.firebasestorage.app",
  messagingSenderId: "955830429309",
  appId: "1:955830429309:web:14b62e339918efed9d3314",
  measurementId: "G-674TSE7ECD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup, signOut };

// ✅ Firestore
export const db = getFirestore(app);

