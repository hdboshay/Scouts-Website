const {initializeApp} = require("firebase-admin/app");
const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const cors = require("cors");
var config = require("./config");

adminApp = initializeApp();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
    from: config.fromEmail,
    to: config.toEmail,
    subject: 'contact form message',
    html: `<h1>Order Confirmation</h1>
     <p> <b>Email: </b>${config.toEmail} </p>`
};

function sendEmail(mailOptions) {
    return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
}

export default sendEmail;