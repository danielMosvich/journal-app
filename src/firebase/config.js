// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAf3cYkz-6F6ET3I60DXFVzj__vgN9Zao",
  authDomain: "react-journal-36a17.firebaseapp.com",
  projectId: "react-journal-36a17",
  storageBucket: "react-journal-36a17.appspot.com",
  messagingSenderId: "150712694017",
  appId: "1:150712694017:web:a77e68a77ade48fe579700"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);