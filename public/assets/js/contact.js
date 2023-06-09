// Import the functions you need from the SDKs you need
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
import app from "/assets/js/load.js"

// Initialize variables
const database = getDatabase();

console.log("contact file loaded")

const contactButton = document.getElementById("contactButton")
if (contactButton) {
  contactButton.addEventListener('click', function(event){
    event.preventDefault()
    submitForm()
  });
}

// Submit form
function submitForm(){
  console.log("in function")
  //Get value
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let subject = document.getElementById('subject').value;
  let message = document.getElementById('message').value;

  console.log(name, email, subject, message);
  console.log(check_fields(name, email, subject, message));

  if (check_fields(name, email, subject, message)) {
    // Save message
    saveMessage(name, email, subject, message);
    console.log("message saved")

    // Show alert
    alert("message sent")
    
    // Clear form
    document.getElementById('contactForm').reset();
  } else {
    alert("One or more of the fields was empty");
  }
}

// Save message to firebase
function saveMessage(name, email, subject, message){
  // Reference messages collection
  var messagesRef = ref(database, 'messages/');

  // Create Message data
  var message_data = {
    name : name,
    email : email,
    subject : subject,
    message : message,
    status : "not seen"
  };

  push(messagesRef, message_data);
}

function check_fields(name, email, subject, message) {
  if (name.length == 0 || email.length == 0 || subject.length == 0 || message.length == 0) {
    return false
  } else {
    return true
  }
}
