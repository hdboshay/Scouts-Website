import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdPZxhZTz7gG31tqEZUloEHF1dP-cFEeY",
  authDomain: "scouts-website-d09ae.firebaseapp.com",
  databaseURL: "https://scouts-website-d09ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scouts-website-d09ae",
  storageBucket: "scouts-website-d09ae.appspot.com",
  messagingSenderId: "129923154201",
  appId: "1:129923154201:web:e367705fa8d686ebf8c588"
};

const app = initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Submit form
function submitForm(){
  alert("submit")
  e.preventDefault();

  //Get value
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var subject = document.getElementById('subject');
  var message = document.getElementById('message');
  
  // Save message
  saveMessage(name, email, subject, message);
  
  // Show alert
  document.querySelector('.alert').style.display = 'block';
  
  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);
  
  // Clear form
  document.getElementById('contactForm').reset();
}

// Save message to firebase
function saveMessage(name, email, subject, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    subject: subject,
    message: message
  });
}
