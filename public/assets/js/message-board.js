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
addMessage()
retrieveMessages()





function addMessage() {

    var ul = document.getElementById("messageList");
    var li = document.createElement("li");

    var message_data = {
        name : "testy",
        email : "@@@@@",
        subject : "funnyyyyyyy",
        message : "YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET",
        status : "not seen"
        };

    li.append(createMessage(message_data));
    ul.appendChild(li);

    console.log("message added")
}

function createMessage(message_data) {
    var message = document.createElement("div")

    var messageHtml = '<div class="col-xl-12 col-md-6 message-item">' +
        '<div class="portfolio1-wrap">' +
            '<div class="portfolio1-info">' +
                '<div class="message-item-info">' +
                    '<p><strong>' + message_data.subject + '</strong></p>' +
                    '<p>' + message_data.name + '</p>' +
                    '<p>' + message_data.email + '</p>' +
                    '<p class="message-item-message">' + message_data.message + '</p>' +
                '</div>' +
                '<div class="message-read">' +
                    '<button id="message-read" class="message-read-btn">message read</button>' +
                '</div>' +
            '</div>' +
        '</div>'  +
    '</div><!-- End Message Item -->'
    message.innerHTML = messageHtml;

    return message
}

function retrieveMessages() {
    console.log("in function")
    onValue(ref(database, "messages/"), (snapshot) => {
        const data = snapshot.val();
        console.log("got value")
        //console.log(data)
        data.forEach(element => {
            console.log(element)
            });
        });
}