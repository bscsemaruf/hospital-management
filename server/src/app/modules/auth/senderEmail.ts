import nodemailer from "nodemailer";
import config from "../../../config";

const senderEmail = async (email: string, html: string) => {
  // Create a transporter using Ethereal test credentials.
  // For production, replace with your actual SMTP server details.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: config.senderEmail.email,
      pass: config.senderEmail.app_pass,
    },
  });

  // Send an email using async/await

  const info = await transporter.sendMail({
    from: '"Hospital management system" <marufhosenbscse@gmail.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};

export default senderEmail;
