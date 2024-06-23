require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usermodel'); 
const jwtSecret = process.env.SECRET_KEY;
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const otps = {};

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.verified) {
    return res.status(201).json({ message: 'User with this email already exists' });
  }

  const otp = generateOtp();
  otps[email] = otp;

  const msg = {
    to: email,
    from: 'finance.yark@gmail.com',
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('OTP sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending OTP');
  }
};

exports.checkVerify = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({ message: 'OTP verification is required before registration' });
  }

  if (!existingUser.verified) {
    return res.status(400).json({ message: 'Email not verified' });
  }

  if(existingUser.verified && existingUser.name!==''){
    return res.status(201).json({ message: 'User already registered' });
  }
  else {
    return res.status(200).json({ message: 'Email verified' });
  }
};

exports.verifyOtp = async (req, res) => {
  console.log("verify");
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send('Email and OTP are required');
  }

  const storedOtp = otps[email];
  if (storedOtp && storedOtp === otp) {
    await User.create({ email: email, verified: true, name: '', password: '', dob: '', location: '', phoneNumber: '', username: '' });
    delete otps[email]; // OTP is valid, remove it from storage
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
};

exports.register = async (req, res) => {
  console.log("register");
  try {
    const { name, email, password, dob, location, phoneNumber, username } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: 'OTP verification is required before registration' });
    }

    if (!existingUser.verified) {
      return res.status(400).json({ message: 'Email not verified' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    existingUser.name = name;
    existingUser.password = hashedPassword;
    existingUser.dob = dob;
    existingUser.location = location;
    existingUser.phoneNumber = phoneNumber;
    existingUser.username = username;

    await existingUser.save();

    res.status(201).json({ message: 'User registered successfully', user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
