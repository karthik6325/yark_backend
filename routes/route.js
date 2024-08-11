const { register, login, sendOtp, verifyOtp, checkVerify } = require('../controllers/authentication');
const { userDetails, getUserDetails, sendMail } = require('../controllers/userdetails');
const { addInvestment, updateInvestment, deleteInvestment, getAllInvestments } = require('../controllers/userInvestments')
const { getAllUsers } = require('../controllers/adminContols')
const { addInsurance, getAllInsurance } = require('../controllers/healthinsurance')
const { addReview, getApprovedReviews, getPendingReviews, acceptRequest, rejectRequest } = require('../controllers/review')
const authenticateToken = require('../middleware/jwtauthorization');
const multer = require('multer');

const router = require('express').Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
.post('/folders', authenticateToken, )
.get('/folders', authenticateToken, )
.put('/api/folders/:id', authenticateToken, )
.delete('/api/folders/:id', authenticateToken, )
.post('/api/folders/:id/documents', authenticateToken, )
.put('/api/folders/:folderId/documents/:documentId', authenticateToken, )
.delete('/api/folders/:folderId/documents/:documentId', authenticateToken, )
.post('/insurance', authenticateToken, addInsurance)
.get('/insurance', authenticateToken, getAllInsurance)
.post('/review', upload.single('image'), addReview)
.get('/reviews', getPendingReviews)
.get('/reviews/approved', getApprovedReviews)
.post('/reviews/update', getApprovedReviews)
.post('/review/accept', acceptRequest)
.post('/review/reject', rejectRequest)
.get('/reviews/accepted', getApprovedReviews)
.post('/contact', sendMail)


module.exports = router;
