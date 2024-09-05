const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const secretKey = process.env.SECRET_KEY; // Access secret key from environment variables

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    // Log the error and return null
    console.error('Token verification failed:', err.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
