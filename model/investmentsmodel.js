const mongoose = require('mongoose');

const investmentPortfolioSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true
  },
  PortfolioName: { type: String, required: true },
  SchemeName: { type: String },
  SIPLumpsum: { type: String }, // Example: SIP/lumpsum
  CommittedForYears: { type: Number }, // Committed for (years)
  CurrentValue: { type: Number },
  MaturityDate: { type: Date },
  ExpectedReturns: { type: Number },
  FutureOfInvestments: { type: String }
});

module.exports = mongoose.model('InvestmentPortfolio', investmentPortfolioSchema);
