const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware'); // Assumes authentication middleware is implemented

/**
 * Route to get a user's favorite posts.
 * This fetches all posts that the authenticated user has favorited.
 */
router.get('/:userId/favorites', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the route parameter
    const favorites = await favoriteController.getFavoritePosts(userId); // Fetch all favorite posts for the user
    res.status(200).json(favorites);
  } catch (error) {
    console.error(`Error fetching favorites for user ${req.params.userId}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});



/**
 * Route to add a post to the authenticated user's favorites.
 */
router.post('/:postId/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from the authenticated user
    const postId = req.params.postId; // Extract postId from the route parameter

    await favoriteController.addFavoritePost(userId, postId); // Add the post to favorites
    res.status(201).json({ message: 'Post added to favorites' });
  } catch (error) {
    console.error(`Error adding post to favorites: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to remove a post from the authenticated user's favorites.
 */
router.delete('/:postId/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from the authenticated user
    const postId = req.params.postId; // Extract postId from the route parameter

    await favoriteController.removeFavoritePost(userId, postId); // Remove the post from favorites
    res.status(200).json({ message: 'Post removed from favorites' });
  } catch (error) {
    console.error(`Error removing post from favorites: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
