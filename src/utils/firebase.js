// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA22QK6PluGrofB0FF1KVRD4XjSPyaUQw",
  authDomain: "netflixgpt-dea8a.firebaseapp.com",
  projectId: "netflixgpt-dea8a",
  storageBucket: "netflixgpt-dea8a.firebasestorage.app",
  messagingSenderId: "841730422373",
  appId: "1:841730422373:web:19efaa965e0a1428d3388c",
  measurementId: "G-0ND443J2LB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
