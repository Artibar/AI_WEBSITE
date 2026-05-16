// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-2e13e.firebaseapp.com",
  projectId: "genwebai-2e13e",
  storageBucket: "genwebai-2e13e.firebasestorage.app",
  messagingSenderId: "1090609040949",
  appId: "1:1090609040949:web:746aef9b98459f528b2b7c",
  measurementId: "G-TTYGN4GLCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider= new GoogleAuthProvider()

export {auth, provider} 