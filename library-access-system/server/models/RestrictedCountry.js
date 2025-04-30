const mongoose = require('mongoose');

const restrictedCountrySchema = new mongoose.Schema({
  code: { type: String, required: true }, // e.g., "US"
  restricted: { type: Boolean, required: true }
});

module.exports = mongoose.model('RestrictedCountry', restrictedCountrySchema);