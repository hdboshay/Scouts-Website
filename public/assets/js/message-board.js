// Import the functions you need from the SDKs you need
import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
import app from "/assets/js/load.js"

// Initialize variables
const database = getDatabase();

console.log("message-board file loaded")

//testing to see if updates work