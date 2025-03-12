const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    // Get token from header
    const token = req.headers['authorization'].split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    try {
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(401).json({ message: 'Invalid token' });
            req.user = user;
        });
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;