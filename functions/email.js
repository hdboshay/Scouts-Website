const admin = require("firebase-admin");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");
var config = require("./config");

console.debug("imports complete")

adminApp = admin.initializeApp();

console.debug("admin init")

export default adminApp;