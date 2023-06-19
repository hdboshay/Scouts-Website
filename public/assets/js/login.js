import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { database } from "firebase/database"

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

// Initialize variables
const auth = getAuth();
const database = database();

function register() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4 || password.length < 4) {
    alert('email or password is invalid');
    return;
  }

  console.log("pre command");
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
    console.log("then");
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    show_error_message()

    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
  console.log("done");
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!! login');
    return;
    // Don't continue running the code
  }

  console.log("test");

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      console.log("logging in");
      // Declare user variable
      var user = auth.currentUser;
    
      // Add this user to Firebase Database
      var database_ref = database.ref();
    
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
    
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data);
    
      // Done
      console.log('User Logged In!!');
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;
      
      console.log(error_message);
    })
}



// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function show_error_message() {
  document.getElementById("error-message").style.visibility = "visible";
} 