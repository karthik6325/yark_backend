const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require('../model/usermodel'); 

const { ObjectId } = require('mongodb');

  exports.userDetails = async (req, res) => {
    const { userId } = req.userId;
    try {
      // Check if user exists with the provided email
      let existingUser = await User.findOne({ _id: new ObjectId(userId) });
  
      if (existingUser) {
        // Update existing user with new details
        existingUser.set(req.body); // Assuming req.body contains all user details
        const updatedUser = await existingUser.save();
        res.status(200).json(updatedUser);
      } else {
        res.status(401).json({message: 'user not verified!'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



  exports.getUserDetails = async (req, res) => {
      try {
        const { userId } = req.userId;
      // Check if user exists with the provided email
      let existingUser = await User.findOne({ _id: new ObjectId(userId) });
  
      if (existingUser) {
        res.status(200).json(existingUser);
      } else {
        res.status(401).json({message: 'no data!'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  exports.sendMail = async (req, res) => {
    const { name, mobile, email, support } = req.body;
  
    const msg = {
      to: 'ceo.yark@gmail.com',
      from: 'finance.yark@gmail.com',
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nSupport needed: ${support}`,
    };
  
    try {
      await sgMail.send(msg);
      res.status(200).send('Email sent successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  