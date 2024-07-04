const mongoose = require('mongoose');

const lifeInsuranceSchema = new mongoose.Schema({
  PolicyName: { type: String, required: true },
  PolicyStartDate: { type: Date, required: true },
  ProposedName: { type: String },
  LifeInsuredName: { type: String },
  CompanyName: { type: String },
  ProductName: { type: String },
  Value: { type: Number },
  PremiumPayingTerm: { type: Number },
  PolicyTerm: { type: Number },
  GuaranteedNonGuaranteedMarketLinked: { type: String }, 
  IncomeBenefitLumpsum: { type: String }, 
  DeathBenefit: { type: Number },
  MaturityDate: { type: Date },
  Nominee: { type: String },
  Relationship: { type: String },
  Notes: { type: String }
});

const investmentPortfolioSchema = new mongoose.Schema({
  PortfolioName: { type: String, required: true },
  SchemeName: { type: String },
  SIPLumpsum: { type: String }, // Example: SIP/lumpsum
  CommittedForYears: { type: Number }, // Committed for (years)
  CurrentValue: { type: Number },
  MaturityDate: { type: Date },
  ExpectedReturns: { type: Number },
  FutureOfInvestments: { type: String }
});

const otherInvestmentsSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Number: { type: String },
  Value: { type: Number },
  StartDate: { type: Date },
  EndDate: { type: Date }
});

const investmentSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  lifeInsurance: [lifeInsuranceSchema],
  investmentPortfolio: [investmentPortfolioSchema],
  otherInvestmets: [otherInvestmentsSchema],
});

module.exports = mongoose.model('Investment', investmentSchema);
