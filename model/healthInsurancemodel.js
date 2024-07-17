const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the HealthInsurance schema
const health = new Schema({
  userId: { 
    type: String, 
    required: true 
  },
  Name: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  SumAssured: {
    type: String,
    required: true
  },
  Premium: {
    type: String,
    required: true
  },
  PolicyStartDate: {
    type: Date,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  Product: {
    type: String,
    required: true
  },
  PortDate: {
    type: Date
  },
  PolicyRenewalStartDate: {
    type: Date
  },
  Commulative: {
    type: String
  },
  Ped: {
    type: String
  }
});


const HealthInsuranceSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    healthInsurance: [health],
  });

// Create the model from the schema
const HealthInsurance = mongoose.model('HealthInsurance', HealthInsuranceSchema);

module.exports = HealthInsurance;