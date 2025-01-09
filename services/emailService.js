const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendAlertEmail(ip, count) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Alert: Excessive Failed Requests from ${ip}`,
    text: `IP ${ip} has exceeded the threshold with ${count} failed requests.`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendAlertEmail };
