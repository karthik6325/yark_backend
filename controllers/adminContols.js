const User = require('../model/usermodel'); 

exports.getAllUsers = async (req, res) => {
    try {
      let users = await User.find({});
  
      if (!users) {
        return res.status(404).json({ error: 'No users found.' });
      }
      else {
        return res.status(200).json({ message: 'success', data: users });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };