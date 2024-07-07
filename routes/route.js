const { register, login, sendOtp, verifyOtp, checkVerify } = require('../controllers/authentication');
const { userDetails, getUserDetails } = require('../controllers/userdetails');
const { addInvestment, updateInvestment, deleteInvestment, getAllInvestments } = require('../controllers/userInvestments')
const { getAllUsers } = require('../controllers/adminContols')
const authenticateToken = require('../middleware/jwtauthorization');

const router = require('express').Router();

router.post('/register', register)
.post('/login', login)
.post('/send', sendOtp)
.post('/verify', verifyOtp)
.post('/check', checkVerify)
.post('/user', authenticateToken, userDetails)
.get('/getdetails', authenticateToken, getUserDetails)
.post('/addinvest', authenticateToken, addInvestment)
.put('/updateinvest', authenticateToken, updateInvestment)
.delete('/deleteinvest',authenticateToken, deleteInvestment)
.get('/getinvests', authenticateToken, getAllInvestments)
.get('/allusers',authenticateToken, getAllUsers)


module.exports = router;
