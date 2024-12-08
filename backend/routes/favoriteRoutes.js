// const express = require('express');
// const router = express.Router();
// const favoriteController = require('../controllers/favoriteController');
// const authMiddleware = require('../middleware/authMiddleware');


// router.get('/:userId/favorites', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.params.userId; // Extract userId from URL params
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Call the controller to get the favorites for the given userId
//     const favorites = await favoriteController.getFavoritePosts(userId);

//     if (favorites.length === 0) {
//       return res.status(404).json({ message: 'No favorites found for this user' });
//     }

//     // Send back the favorite posts
//     res.status(200).json(favorites);
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Handle any errors
//   }
// });

// // Route to add a post to a user's favorites
// router.post('/:postId/favorites', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract userId from the authenticated user
//     const postId = req.params.postId; // Extract postId from the URL

//     await favoriteController.addFavoritePost(userId, postId);
//     res.status(201).json({ message: 'Post added to favorites' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: error.message });
//   }
// });


// // Route to remove a post from a user's favorites
// router.delete('/:postId/favorites', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract from authMiddleware
//     const { postId } = req.params;
//     await favoriteController.removeFavoritePost(userId, postId);
//     res.status(200).json({ message: 'Post removed from favorites' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
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
