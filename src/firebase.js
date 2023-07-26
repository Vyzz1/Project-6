// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxi2fsOfdAJdN6bnJBlfT6B_8wEwDTVX4",
  authDomain: "project6-6ffef.firebaseapp.com",
  projectId: "project6-6ffef",
  storageBucket: "project6-6ffef.appspot.com",
  messagingSenderId: "465981917305",
  appId: "1:465981917305:web:35d9de24c2380383f06ca8",
  measurementId: "G-376ZF0RWHE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
