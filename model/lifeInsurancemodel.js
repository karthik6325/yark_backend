const mongoose = require('mongoose');

const lifeInsuranceSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true
  },
  PolicyName: { type: String, required: true },
  PolicyStartDate: { type: Date, required: true },
  ProposedName: { type: String },
  LifeInsuredName: { type: String },
  CompanyName: { type: String },
  ProductName: { type: String },
  Value: { type: Number },
  PremiumPayingTerm: { type: Number },
  PolicyTerm: { type: Number },
  GuaranteedNonGuaranteedMarketLinked: { type: String }, // Example: Guaranteed/Non-Guaranteed/Market-Linked
  IncomeBenefitLumpsum: { type: String }, // Example: IncomeBenefit/Lumpsum
  DeathBenefit: { type: Number },
  MaturityDate: { type: Date },
  Nominee: { type: String },
  Relationship: { type: String },
  Notes: { type: String }
});

module.exports = mongoose.model('LifeInsurance', lifeInsuranceSchema);
