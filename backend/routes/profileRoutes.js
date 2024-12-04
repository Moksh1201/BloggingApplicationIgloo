// const express = require('express');
// const profileController = require('../controllers/profileController');
// const authMiddleware = require('../middleware/authMiddleware');
// const User = require('../models/user'); 

// const router = express.Router();

// // Route to get all users
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const users = await profileController.getAllUsers(); // Fetch users from MongoDB
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to get a user profile by ID
// router.get('/:id', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const profile = await profileController.getProfile(userId); // Fetch profile from MongoDB 
//     if (profile) {
//       res.status(200).json(profile);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to follow a user
// router.post('/:id/follow', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id; // ID of the user sending the follow request
//     const followId = req.params.id; // ID of the user to be followed

//     // Fetch current user and target user from MongoDB
//     const currentUser = await User.findById(userId);
//     const targetUser = await User.findById(followId);

//     if (!currentUser) {
//       return res.status(404).json({ message: 'Current user not found' });
//     }
//     if (!targetUser) {
//       return res.status(404).json({ message: 'Target user not found' });
//     }

//     // Initialize missing fields with default values
//     targetUser.followers = targetUser.followers || [];
//     currentUser.following = currentUser.following || [];

//     // Check if already following
//     if (targetUser.followers.includes(userId)) {
//       return res.status(400).json({ message: 'You are already following this user' });
//     }

//     // Add the user to the followers and following lists
//     targetUser.followers.push(userId);
//     currentUser.following.push(followId);

//     // Save the updated data to MongoDB
//     await targetUser.save();
//     await currentUser.save();

//     return res.status(200).json({ message: 'You are now following this user' });
//   } catch (error) {
//     console.error('Error in follow route:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Route to unfollow a user
// router.post('/:id/unfollow', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const unfollowId = req.params.id;

//     if (!userId || !unfollowId) {
//       return res.status(400).json({ message: "Invalid parameters." });
//     }

//     const result = await profileController.unfollowUser(userId, unfollowId);

//     if (result.success) {
//       res.status(200).json({ message: "Successfully unfollowed.", success: true });
//     } else {
//       res.status(400).json({ message: "Could not unfollow.", success: false });
//     }
//   } catch (error) {
//     console.error("Unfollow error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update user profile
// router.put('/:id', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedProfile = req.body;

//     // Update the user profile in MongoDB
//     const updatedUser = await profileController.updateProfile(userId, updatedProfile);

//     res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
//   } catch (error) {
//     console.error('Error in profile update route:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to check if the current user follows another user
// router.get('/:currentUserId/follows/:userId', authMiddleware, async (req, res) => {
//   try {
//     const { currentUserId, userId } = req.params;

//     // Fetch current user from MongoDB
//     const currentUser = await User.findById(currentUserId);
//     const isFollowed = currentUser?.following?.includes(userId);

//     res.status(200).json({ isFollowed });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Batch users by IDs
// router.post('/batch-users', authMiddleware, async (req, res) => {
//   try {
//     const { userIds } = req.body; // Expecting an array of user IDs
//     const users = await User.find({ _id: { $in: userIds } }); // Fetch users in batch by IDs
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
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
    const profile = await profileController.getProfile(userId); // Fetch profile from MongoDB 
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
    const userId = req.user.id; // ID of the user sending the follow request
    const followId = req.params.id; // ID of the user to be followed

    // Call the followUser method from profileController
    const result = await profileController.followUser(userId, followId);

    return res.status(200).json(result); // Return success message
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

    // Call the updateProfile method from profileController
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

    // Fetch current user from MongoDB
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
    const { userIds } = req.body; // Expecting an array of user IDs
    const users = await User.find({ _id: { $in: userIds } }); // Fetch users in batch by IDs
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
