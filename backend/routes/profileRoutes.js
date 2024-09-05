const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all users
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await profileController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a user profile by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await profileController.getProfile(userId);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a user profile by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedProfile = req.body;
    const profile = await profileController.updateProfile(userId, updatedProfile);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
