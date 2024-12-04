const Favorite = require('../models/favorite'); // Import the Favorite model

// Add a post to favorites
const addFavoritePost = async (userId, postId) => {
  // Check if the favorite already exists to avoid duplicates
  const existingFavorite = await Favorite.findOne({ userId, postId });
  if (existingFavorite) {
    throw new Error('Post is already in favorites');
  }

  // Create a new favorite entry
  const newFavorite = new Favorite({
    userId,
    postId,
  });

  // Save the new favorite to the database
  await newFavorite.save();
};

// Get all favorite posts for a user
const getFavoritePosts = async (userId) => {
  if (!userId) {
    console.error("No userId provided.");
    return [];
  }

  // Find all favorite posts by the user
  const userFavorites = await Favorite.find({ userId }).populate('postId', 'title content'); // Optionally populate post details
  return userFavorites;
};

// Remove a post from favorites
const removeFavoritePost = async (userId, postId) => {
  // Find and remove the favorite entry
  const result = await Favorite.deleteOne({ userId, postId });

  if (result.deletedCount === 0) {
    throw new Error('Favorite not found');
  }
};

module.exports = {
  addFavoritePost,
  getFavoritePosts,
  removeFavoritePost,
};
