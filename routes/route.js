const { register, login, sendOtp, verifyOtp } = require('../controllers/authentication');
const authenticateToken = require('../middleware/jwtauthorization');

const router = require('express').Router();

router.post('/register', register)
.post('/login', login)
.post('/send', sendOtp)
.post('/verify', verifyOtp)

module.exports = router;
