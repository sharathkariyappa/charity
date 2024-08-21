import nodemailer from 'nodemailer';
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
const GOOGLE_EMAIL_PASSWORD = process.env.GOOGLE_EMAIL_PASSWORD;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_EMAIL_PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export default transporter;