const User = require('../model/usermodel'); 

  exports.userDetails = async (req, res) => {
    const { userId } = req.body;

    
    try {
      // Check if user exists with the provided email
      let existingUser = await User.findOne({ userId });
  
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
        const { userId } = req.body;
        console.log("hghj")
      // Check if user exists with the provided email
      let existingUser = await User.findOne({ userId });
  
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