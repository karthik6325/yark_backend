require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    const tokenWithoutBearer = token.split(' ')[1];


    if (!tokenWithoutBearer) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    jwt.verify(tokenWithoutBearer, secretKey, (err, userId) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ message: 'Forbidden - Token verification failed' });
        }
        console.log("user", userId)
        req.userId = userId;
        next();
    });
};


module.exports = authenticateToken;
