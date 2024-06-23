const mongoose = require('mongoose');

// Define child schema
const childSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
});

// Define spouse schema
const spouseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
});

// Define parent schema
const parentSchema = new mongoose.Schema({
  fatherName: {
    type: String,
  },
  fatherDOB: {
    type: Date,
  },
  motherName: {
    type: String,
  },
  motherDOB: {
    type: Date,
  },
});

// Define sibling schema
const siblingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
  },
  password: {
    type: String,
  },
  dob: {
    type: Date,
  },
  location: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  username: {

    type: String,
  },
  children: [childSchema],
  spouse: spouseSchema,
  parents: [parentSchema],
  siblings: [siblingSchema],
});

module.exports = mongoose.model('User', userSchema);
