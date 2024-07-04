const User = require('../model/usermodel'); 

const { ObjectId } = require('mongodb');

  exports.userDetails = async (req, res) => {
    const { userId } = req.userId;
    try {
      // Check if user exists with the provided email
      let existingUser = await User.findOne({ _id: new ObjectId(userId) });
      console.log("user", existingUser)
  
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
        console.log(req)
      // Check if user exists with the provided email
      let existingUser = await User.findOne({ _id: new ObjectId(userId) });
      console.log(existingUser)
  
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