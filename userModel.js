const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  cvvNumber: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    required: true
  },
  bankName: {  // Added bankName field
    type: String,
    required: true
  },
  otp: {  // Updated to array of strings
    type: [String],
    required: false
  }
});

module.exports = mongoose.model('Card', cardSchema);
