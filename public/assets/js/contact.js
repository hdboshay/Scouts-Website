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
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var subject = document.getElementById('subject');
  var message = document.getElementById('message');
  console.log(name, email, subject, message)
  // Save message
  console.log("saving message")
  saveMessage(name, email, subject, message);
  console.log("message saved")
  // Show alert
  alert("message sent")
  
  // Clear form
  document.getElementById('contactForm').reset();
}

// Save message to firebase
function saveMessage(name, email, subject, message){
  // Reference messages collection
  var messagesRef = ref(database, 'messages/');
  console.log("ref aquired")

  // Create Message data
  var message_data = {
    name : name,
    email : email,
    subject : subject,
    message : message
  };

  console.log(name, email, subject, message)

  push(messagesRef, message_data);
}
