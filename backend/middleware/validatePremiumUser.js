const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY || 'vG7yL*4s&uVxwRmd@M!z9^Tj0Q$e6H5';

const validatePremiumUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); 
    req.user = decoded; 


    if (!req.user.isPremium) {
      return res.status(403).json({ message: 'Forbidden. Premium user access required.' });
    }

    next(); 
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

module.exports = validatePremiumUser;
