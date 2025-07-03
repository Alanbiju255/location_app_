// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCR7tIs1AVVaJC2bDSHv0BJb1mRtAFbU-w",
  authDomain: "reactlocationapp-6e12e.firebaseapp.com",
  projectId: "reactlocationapp-6e12e",
  storageBucket: "reactlocationapp-6e12e.firebasestorage.app",
  messagingSenderId: "318872871106",
  appId: "1:318872871106:web:cc476ff869954a48309b5b",
  measurementId: "G-29KXHNWP9W"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
