const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  originalName: String,
  analysisResult: String,
  uploadedAt: { type: Date, default: Date.now },
  textDescription: { type: String },
});

module.exports = mongoose.model('Image', imageSchema);