const { register, login, sendOtp, verifyOtp, checkVerify } = require('../controllers/authentication');
const { userDetails, getUserDetails } = require('../controllers/userdetails');
const authenticateToken = require('../middleware/jwtauthorization');

const router = require('express').Router();

router.post('/register', register)
.post('/login', login)
.post('/send', sendOtp)
.post('/verify', verifyOtp)
.post('/check', checkVerify)
.post('/user', authenticateToken, userDetails)
.get('/getdetails', authenticateToken, getUserDetails);
module.exports = router;
