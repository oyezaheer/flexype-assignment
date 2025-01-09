const { trackFailedRequest } = require('../services/rateLimiterService');
const { sendAlertEmail } = require('../services/emailService');
const FailedRequest = require('../models/failedRequest');

require('dotenv').config();

async function submitHandler(req, res) {
  const ip = req.ip;
  const isValid = req.headers['x-access-token'] === 'valid_token';

  if (!isValid) {
    const reason = 'Invalid token';
    const count = await trackFailedRequest(ip);

    // Log failure to MongoDB
    await FailedRequest.create({ ip, reason });

    // Trigger alert
    if (count > process.env.THRESHOLD) {
      await sendAlertEmail(ip, count);
    }

    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ message: 'Success' });
}

module.exports = { submitHandler };
