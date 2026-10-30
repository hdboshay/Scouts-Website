// Import the functions you need from the SDKs you need
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
console.debug("db suc")
//const nodemailer = require('nodemailer');
//console.debug("node suc")
import app from "/assets/js/load.js";
console.debug("app init")

import adminApp from "../../../functions/email.js";
console.debug("admin init")

console.debug("finished imports")
// Create a transporter using SMTP
//const transporter = nodemailer.createTransport({
//  host: "smtp.gmail.com",
//  port: 587,
//  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
//  auth: {
//   user: process.env.SMTP_USER,
//    pass: process.env.SMTP_PASS,
//  },
//});

console.debug(process.env.SMTP_USER)
console.debug("working?")

// Initialize variables
const database = getDatabase();

const contactButton = document.getElementById("contactButton")
if (contactButton) {
  contactButton.addEventListener('click', function(event){
    event.preventDefault()
    submitForm()
  });
}

// Submit form
function submitForm(){
  //Get value
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let subject = document.getElementById('subject').value;
  let message = document.getElementById('message').value;

  if (check_fields(name, email, subject, message)) {
    // Save message
    saveMessage(name, email, subject, message);

    // Show alert
    alert("Message Submitted.\nIf you do not hear back within 1-2 weeks, try dropping our Group Scout Master an email!")
    
    
    // Clear form
    //document.getElementById('contactForm').reset();
  } else {
    alert("One or more of the fields was empty");
  }
}

// Save message to firebase
function saveMessage(name, email, subject, message){
  // Reference messages collection
  var messagesRef = ref(database, 'messages/');
  var date = new Date()

  // Create Message data
  var message_data = {
    name : name,
    email : email,
    subject : subject,
    message : message,
    status : "not seen",
    date_submitted : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
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