require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    const tokenWithoutBearer = token.split(' ')[1];


    if (!tokenWithoutBearer) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ message: 'Forbidden - Token verification failed' });
        }
        req.user = user;
        next();
    });
};


module.exports = authenticateToken;
