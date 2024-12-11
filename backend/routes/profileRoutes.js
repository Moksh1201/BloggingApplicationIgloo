const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');

const router = express.Router();

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
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to follow a user
router.post('/:id/follow', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    const followId = req.params.id; 

    const result = await profileController.followUser(userId, followId);

    return res.status(200).json(result); 
  } catch (error) {
    console.error('Error in follow route:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to unfollow a user
router.post('/:id/unfollow', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const unfollowId = req.params.id;

    // Call the unfollowUser method from profileController
    const result = await profileController.unfollowUser(userId, unfollowId);

    return res.status(200).json(result); // Return success message
  } catch (error) {
    console.error('Error in unfollow route:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedProfile = req.body;

    const updatedUser = await profileController.updateProfile(userId, updatedProfile);

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error in profile update route:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route to check if the current user follows another user
router.get('/:currentUserId/follows/:userId', authMiddleware, async (req, res) => {
  try {
    const { currentUserId, userId } = req.params;

    const currentUser = await User.findById(currentUserId);
    const isFollowed = currentUser?.following?.includes(userId);

    res.status(200).json({ isFollowed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Batch users by IDs
router.post('/batch-users', authMiddleware, async (req, res) => {
  try {
    const { userIds } = req.body; 
    const users = await User.find({ _id: { $in: userIds } }); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
