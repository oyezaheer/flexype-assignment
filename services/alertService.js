const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

/**
 * Sends an email notification to the specified email address.
 * 
 * @param {string} subject - Subject of the email.
 * @param {string} text - The content of the email.
 */
const sendAlertEmail = async (subject, text) => {
  try {
    // Create a transporter using your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,  // You can also send to multiple email addresses
      subject: subject,
      text: text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Alert email sent: ${subject}`);
  } catch (error) {
    console.error('Error sending alert email:', error);
  }
};

/**
 * Creates the alert message for failed requests.
 * 
 * @param {string} ip - The IP address from which the failed requests originated.
 * @param {number} failedAttempts - The number of failed attempts.
 * @param {number} threshold - The threshold value that triggered the alert.
 * @param {string} reason - The reason why the requests failed.
 * @returns {string} - The alert message content.
 */
const createAlertMessage = (ip, failedAttempts, threshold, reason) => {
  return `
    Alert: High number of failed POST requests detected

    Source IP: ${ip}
    Failed Attempts: ${failedAttempts}
    Threshold Exceeded: ${threshold}
    Reason: ${reason}

    Action required to investigate and mitigate the issue.
  `;
};

/**
 * Triggers an alert based on the failed POST request data.
 * 
 * @param {string} ip - The IP address from which the failed requests originated.
 * @param {number} failedAttempts - The number of failed attempts.
 * @param {number} threshold - The threshold value that triggered the alert.
 * @param {string} reason - The reason why the requests failed.
 */
const triggerAlert = async (ip, failedAttempts, threshold, reason) => {
  const subject = `Alert: ${failedAttempts} Failed POST Requests from ${ip}`;
  const message = createAlertMessage(ip, failedAttempts, threshold, reason);

  // Send the alert email
  await sendAlertEmail(subject, message);
};

module.exports = {
  triggerAlert,
};
