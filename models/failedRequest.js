const mongoose = require('../utils/database');

const failedRequestSchema = new mongoose.Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
  reason: String,
});

module.exports = mongoose.model('FailedRequest', failedRequestSchema);
