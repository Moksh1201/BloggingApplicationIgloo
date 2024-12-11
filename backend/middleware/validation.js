const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('username')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .matches(/^[^\d]/).withMessage('Username must not start with a number'),
  
  body('email')
    .isEmail().withMessage('Invalid email address'),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one special character and one number'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body('email')
    .isEmail().withMessage('Invalid email address'),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegister,
  validateLogin,
};
