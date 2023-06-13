
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
const auth = firebase.auth()
const database = firebase.database()

//Set up our register function
function register () {
    //get all our input fields
    email = "test@gmail.com"
    password = "1234567"
    username = "test1"
    usertype = "leader"

    //validate user fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert("email or password isnt valid")
        return
        //dont continue
    }
    if (validate_fields(username) == false || validate_fields(usertype) == false) {
        alert("one or more of the extra fields is invalid")
        return
        //dont continue
    }

    //continue with auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser

        //add user to firebase database
        var database_ref = database.ref()

        //create user data
        var user_data = {
            email : email,
            username : username,
            usertype : usertype,
            lastLogin : Date.now()
        }

        database_ref.child("users/" + user.uid).set(user_data)


        alert("user created")

    })
    .catch(function(error) {
        // Firebase will use this to update us of its errors
        var error_code = error.code
        var error_message = error.messagingSenderId

        alert(error_message)
    })
}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/

    if (expression.test(email) == true) {
        //email is good
        return true
    } else {
        //email is bad
        return false
    }
}

function validate_password(password) {
    if (password > 6) {
        //password is good
        return true
    } else {
        //password is bad
        return false
    }
}

function validate_fields(field) {
    if (field == null) {
        //field is bad
        return false
    }

    if (field.length > 0) {
        //field is good
        return true
    } else {
        //field is bad
        return false
    }
}