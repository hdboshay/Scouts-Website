// Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
import app from "/public/assets/js/load.js"

// Initialize variables
const auth = getAuth();
const database = getDatabase();

//buttons
const loginButton = document.getElementById("loginButton")
if (loginButton) {
  loginButton.addEventListener('click', login)
}

const registerButton = document.getElementById("registerButton")
if (registerButton) {
  registerButton.addEventListener('click', register)
}


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
  console.log("step 1");

  // Get all our input fields
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  console.log("step 2");
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    show_error_message()
    return;
    // Don't continue running the code
  }

  console.log("step 3");

  signInWithEmailAndPassword(auth, email, password)
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
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
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