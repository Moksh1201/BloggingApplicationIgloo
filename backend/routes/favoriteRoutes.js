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

router.get('/:postId/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from the middleware
    const { postId } = req.params;
    const favorites = await favoriteController.getFavoritePosts(userId); // Fetch posts that the user has saved
    res.status(200).json(favorites); // Send back the saved posts
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
