const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  ip: String,
  country: String,
  timestamp: { type: Date, default: Date.now },
  accessGranted: Boolean
});

module.exports = mongoose.model('AccessLog', accessLogSchema);