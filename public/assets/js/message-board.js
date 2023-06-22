// Import the functions you need from the SDKs you need
import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
import app from "/assets/js/load.js"

// Initialize variables
const database = getDatabase();

//buttons
const addmessage = document.getElementById("add-message")
if (addmessage) {
    addmessage.addEventListener('click', function(event){
        console.log("message yes")
        addMessage()
    });
}

console.log("message-board file loaded")






function addMessage() {

    var ul = document.getElementById("messageList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("new message"));
    ul.appendChild(li);

    console.log("message added")
}