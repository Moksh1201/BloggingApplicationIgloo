// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const profileController = require('../controllers/profileController');
// const authenticate = require('../middleware/authMiddleware'); 
// const { validateRegister, validateLogin } = require('../middleware/validation');

// // Route to register a new user
// router.post('/register', validateRegister, async (req, res) => {
//   try {
//     const user = req.body;
//     const newUser = await authController.registerUser(user);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/me', authenticate, async (req, res) => { 
//   console.log("Fetching profile for user ID:", req.user.id); 
//   try {
//     const userId = req.user.id; 
//     const profile = await profileController.getProfile(userId); 
//     if (profile) {
//       res.status(200).json(profile);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to log out a user
// router.post('/logout', authenticate, (req, res) => { 
//   // Invalidate the session or token here
//   req.logout(); // If you are using express-session
//   // Optionally, blacklist the token or remove it from your database if using JWTs

//   res.status(200).json({ message: 'Logout successful' });
// });


// // Route to log in a user
// router.post('/login', validateLogin, async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await authController.loginUser(email, password);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const authenticate = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validation');

// Route to register a new user
router.post('/register', validateRegister, async (req, res) => {
  try {
    const user = req.body;
    const newUser = await authController.registerUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch the profile of the logged-in user
router.get('/me', authenticate, async (req, res) => {
  console.log("Fetching profile for user ID:", req.user?.id); // Add this log to check the user ID
  try {
    const userId = req.user.id;
    const profile = await profileController.getProfile(userId);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message });
  }
});


// Route to log out a user
router.post('/logout', authenticate, (req, res) => {
  // Implement session or token invalidation logic
  req.logout(); // If using `express-session`
  // Blacklist the JWT token or remove it from the database if applicable

  res.status(200).json({ message: 'Logout successful' });
});

// Route to log in a user
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authController.loginUser(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
