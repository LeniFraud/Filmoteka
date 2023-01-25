import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNhIYC2eM1ttWzdDpktzLFDrqO8uU3w-0",
    authDomain: "themoviedb-filmoteka.firebaseapp.com",
    projectId: "themoviedb-filmoteka",
    storageBucket: "themoviedb-filmoteka.appspot.com",
    messagingSenderId: "750145730003",
    appId: "1:750145730003:web:163339f665817ff7e96b26",
    measurementId: "G-ZEDYF18P6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

