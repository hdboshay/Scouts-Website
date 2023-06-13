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
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = "test@gmail.com"
  password = "1234567"
  username = "test1"
  usertype = "leader"

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!! register')
    return
    // Don't continue running the code
  }
  if (validate_field(username) == false || validate_field(usertype) == false) {
    alert('One or More Extra Fields is Outta Line!! register')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      alert("yes")
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email : email,
        username : username,
        usertype : usertype,
        last_login : Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // Done
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!! login')
    return
    // Don't continue running the code
  }

  alert("test")

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      alert("logging in")
      // Declare user variable
      var user = auth.currentUser
    
      // Add this user to Firebase Database
      var database_ref = database.ref()
    
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
    
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
    
      // Done
      alert('User Logged In!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
      
      alert(error_message)
    })
}



// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
} 

function show_error_message() {
  document.getElementById("error-message").style.visibility = "visible";
} 