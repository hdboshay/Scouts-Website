// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdPZxhZTz7gG31tqEZUloEHF1dP-cFEeY",
  authDomain: "scouts-website-d09ae.firebaseapp.com",
  databaseURL: "https://scouts-website-d09ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scouts-website-d09ae",
  storageBucket: "scouts-website-d09ae.appspot.com",
  messagingSenderId: "129923154201",
  appId: "1:129923154201:web:e367705fa8d686ebf8c588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;