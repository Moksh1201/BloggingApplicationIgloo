// const { verifyToken } = require('../services/authService');

// const authenticate = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const decoded = verifyToken(token.replace('Bearer ', ''));
//   if (!decoded) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }

//   req.user = decoded; 
//   next(); 
// };

// module.exports = authenticate;
const { verifyToken } = require('../services/authService');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  req.user = {
    id: decoded.id,         
    username: decoded.username,
    isAdmin: decoded.isAdmin

  };
  next(); 
};

module.exports = authenticate;