// Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
import app from "/assets/js/load.js"

// Initialize variables
const auth = getAuth();
const database = getDatabase();

console.log("login file loaded")

//buttons
const loginButton = document.getElementById("loginButton")
if (loginButton) {
  loginButton.addEventListener('click', function(event){
    console.log("login pressed")
    event.preventDefault()
    login()
  });
}

const registerButton = document.getElementById("registerButton")
if (registerButton) {
  registerButton.addEventListener('click', function(event){
    event.preventDefault()
    register()
  });
}


function register() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let username = document.getElementById('username').value;
  let usertype = document.getElementById('usertype').value;

  console.log(email, password, username, usertype)
  // Create user with email and pass.
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("user created and signed in");

    // Declare user variable
    const user = userCredential.user;

    // Create User data
    var user_data = {
      email : email,
      username : username,
      usertype : usertype,
      last_login : Date.now()
    }
    
    update(ref(database, 'users/' + user.uid), user_data);
    show_message("user-created")
    console.log("done")
  })

  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code;
    var error_message = error.message;
    show_message("error-message")
    
    console.log(error_message);
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("logging in");
      // Declare user variable
      const user = userCredential.user;

      // Create User data
      var user_data = {
        last_login : Date.now()
      }
      
      update(ref(database, "users/" + user.uid), user_data);
      
      console.log("user login time recorded")

      onValue(ref(database, "users/" + user.uid), (snapshot) => {
        const data = snapshot.val();
        console.log(data)
      });
      

      // Done
      console.log('User Logged In!!');
      location.href = 'index.html';
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;
      show_message("error-message")
      
      console.log(error_message);
    })
    console.log("bottom of function")
}

function show_message(messagetype) {
  let message = document.getElementById(messagetype)
  
  if (message){
    message.style.visibility = "visible"
  }
} 