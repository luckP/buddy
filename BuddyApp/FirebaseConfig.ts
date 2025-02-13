// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4-u13dvO2S4TquBOshx393qxOEetphM4",
  authDomain: "buddy-39ed4.firebaseapp.com",
  projectId: "buddy-39ed4",
  storageBucket: "buddy-39ed4.firebasestorage.app",
  messagingSenderId: "655447605575",
  appId: "1:655447605575:web:7d6f9098c70edbcb390c62",
  measurementId: "G-WZPL1K6JD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export consts
export const FIREBASE_APP = app;
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);