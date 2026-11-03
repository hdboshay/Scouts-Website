const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const nodemailer  = require("nodemailer");

admin.initializeApp();


// http callable function
exports.sendEmail = onCall(
    {secrets: ["NODEMAILER_CONFIG"]},
    (data, context) => {
      const nodemailerConfig = JSON.parse(process.env.NODEMAILER_CONFIG);
      const form_data = data.data;

      let transporter = nodemailer.createTransport({
        host: nodemailerConfig.host,
        port: nodemailerConfig.port,
        secure: true,
        auth: {
            user: nodemailerConfig.username,
            pass: nodemailerConfig.password
        }
      });

      let mailOptions = {
        from: nodemailerConfig.from_email,
        to: `${nodemailerConfig.to_email}`,
        subject: `1DS Website enquiry - ${form_data.subject}`,
        html: 
          `<body>
            <p>Enquiry : ${form_data.message}</p>
            <p>From : ${form_data.name}</p>
            <p>Contact Email : ${form_data.email}</p>
          </body>`
      }

      return transporter.sendMail(mailOptions)
        .catch((err)=>{
          console.log("\n\n",err)
        });
    });