// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCq9_xuH3hssIzGbF8M3ncO7kZ7N8V1i_E",
  authDomain: "localmix-c01b1.firebaseapp.com",
  projectId: "localmix-c01b1",
  storageBucket: "localmix-c01b1.firebasestorage.app",
  messagingSenderId: "700060402216",
  appId: "1:700060402216:web:042bc231d8ef5778e9ab1d",
  measurementId: "G-CTGRLG1QFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth, analytics}