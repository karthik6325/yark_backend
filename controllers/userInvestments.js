const User = require('../model/usermodel'); 

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