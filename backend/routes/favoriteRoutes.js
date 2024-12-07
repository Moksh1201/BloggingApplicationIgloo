const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get a user's favorite posts
// router.get('/:userId', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract from authMiddleware
//     const favorites = await favoriteController.getFavoritePosts(userId);
//     res.status(200).json(favorites);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/:userId/favorites', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract userId from the middleware
//     const { postId } = req.params; // Extract postId from URL params

//     // Call the controller to get the favorites
//     const favorites = await favoriteController.getFavoritePosts(userId, postId);

//     // If no favorites found
//     if (favorites.length === 0) {
//       return res.status(404).json({ message: 'No favorites found' });
//     }

//     // Send back the favorite posts
//     res.status(200).json(favorites);
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Handle any errors
//   }
// });
router.get('/:userId/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL params
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Call the controller to get the favorites for the given userId
    const favorites = await favoriteController.getFavoritePosts(userId);

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }

    // Send back the favorite posts
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
});

// Route to add a post to a user's favorites
router.post('/:postId/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from the authenticated user
    const postId = req.params.postId; // Extract postId from the URL

    await favoriteController.addFavoritePost(userId, postId);
    res.status(201).json({ message: 'Post added to favorites' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});


// Route to remove a post from a user's favorites
router.delete('/:postId/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract from authMiddleware
    const { postId } = req.params;
    await favoriteController.removeFavoritePost(userId, postId);
    res.status(200).json({ message: 'Post removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
