const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './server/.env' });

module.exports = function (req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token
  console.log('Token:', token);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log('Decoded Token:', decoded); // Debugging: Log the decoded token
    req.user = decoded; // Attach decoded payload to the request
    next();
  } catch (err) {
    console.error('Token verification error:', err.message); // Debugging: Log the error
    res.status(403).json({ message: 'Invalid token' });
  }
};