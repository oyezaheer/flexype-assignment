const FailedRequest = require('../models/failedRequest');

async function getMetrics(req, res) {
  const metrics = await FailedRequest.find();
  res.status(200).json(metrics);
}

module.exports = { getMetrics };
