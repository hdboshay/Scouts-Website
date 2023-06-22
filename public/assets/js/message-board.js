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

    var message_data = {
        name : "",
        email : "",
        subject : "",
        message : "",
        status : "not seen"
        };

    console.log(message_data.status)

    li.append(createMessage());
    ul.appendChild(li);

    console.log("message added")
}

function createMessage() {
    var message = document.createElement("div")

    var messageHtml = '<div class="col-xl-12 col-md-6 message-item">' +
        '<div class="portfolio1-wrap">' +
            '<div class="portfolio1-info">' +
                '<div class="message-item-info">' +
                    '<p><strong>placeholder subjectasdasdasdasd</strong></p>' +
                    '<p>placeholder name</p>' +
                    '<p>placeholder email</p>' +
                    '<p class="message-item-message">placeholder mesage</p>' +
                '</div>' +
                '<div class="message-read">' +
                    '<button id="message-read" class="message-read-btn">message read</button>' +
                '</div>' +
            '</div>' +
        '</div>'  +
    '</div><!-- End Message Item -->'
    message.innerHTML = messageHtml;

    console.log(message)

    return message
}