const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); 

const secretKey = process.env.SECRET_KEY; 

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username,isAdmin: user.isAdmin, isPremium: user.isPremium }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
