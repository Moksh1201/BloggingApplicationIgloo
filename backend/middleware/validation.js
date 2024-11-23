// const { body, validationResult } = require('express-validator');

// const validateRegister = [
//   body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
//   body('email').isEmail().withMessage('Invalid email address'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

// const validateLogin = [
//   body('email').isEmail().withMessage('Invalid email address'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

// module.exports = {
//   validateRegister,
//   validateLogin,
// };
const { body, validationResult } = require('express-validator');

const validateRegister = [
  // Username must be at least 3 characters long and not start with a number
  body('username')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .matches(/^[^\d]/).withMessage('Username must not start with a number'),
  
  // Email must be a valid email
  body('email')
    .isEmail().withMessage('Invalid email address'),
  
  // Password must be at least 6 characters long, include a special character, and a number
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one special character and one number'),
  
  // Custom middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  // Email must be a valid email
  body('email')
    .isEmail().withMessage('Invalid email address'),
  
  // Password must be at least 6 characters long
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
  // Custom middleware to handle validation errors
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
