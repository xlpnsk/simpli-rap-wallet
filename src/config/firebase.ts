// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import 'firebase/auth';
import {getAnalytics} from "firebase/analytics"
import { Constants } from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6wK_J5IVLHIQoml7L8ZuUEimOzHMpOh8",
    authDomain: "simplirapwallet-af624.firebaseapp.com",
    projectId: "simplirapwallet-af624",
    storageBucket: "simplirapwallet-af624.appspot.com",
    messagingSenderId: "7865569113",
    appId: "1:7865569113:web:334eb65045a56562650648",
    measurementId: "G-7BSWGGMNPR"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

export default app;