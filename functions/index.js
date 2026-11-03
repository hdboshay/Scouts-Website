const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// http callable function
exports.sendEmail = onCall(
    {secrets: ["NODEMAILER_CONFIG"]},
    (data, context) => {
      const nodemailerConfig = JSON.parse(process.env.NODEMAILER_CONFIG);
      const formData = data.data;

      const transporter = nodemailer.createTransport({
        host: nodemailerConfig.host,
        port: nodemailerConfig.port,
        secure: true,
        auth: {
          user: nodemailerConfig.username,
          pass: nodemailerConfig.password,
        },
      });

      const mailOptions = {
        from: nodemailerConfig.from_email,
        to: `${nodemailerConfig.to_email}`,
        subject: `1DS Website enquiry - ${formData.subject}`,
        html:
          `<body>
            <p>Enquiry : ${formData.message}</p>
            <p>From : ${formData.name}</p>
            <p>Contact Email : ${formData.email}</p>
          </body>`,
      };

      return transporter.sendMail(mailOptions)
          .catch((err)=>{
            console.log("\n\n", err);
          });
    });
