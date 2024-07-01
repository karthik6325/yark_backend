const mongoose = require('mongoose');

const otherInvestmentsSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true
  },
  Name: { type: String, required: true },
  Number: { type: String },
  Value: { type: Number },
  StartDate: { type: Date },
  EndDate: { type: Date }
});

module.exports = mongoose.model('OtherInvestments', otherInvestmentsSchema);
