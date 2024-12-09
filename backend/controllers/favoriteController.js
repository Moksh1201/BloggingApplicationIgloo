const Favorite = require('../models/favorite'); // Import the Favorite model
const Post = require('../models/Post'); // Import the Post model

/**
 * Add a post to the user's favorites
 */
const addFavoritePost = async (userId, postId) => {
  try {
    if (!userId || !postId) {
      throw new Error('Both userId and postId are required');
    }

    // Ensure the post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      throw new Error('Post not found');
    }

    // Avoid duplicates
    const isDuplicate = await Favorite.findOne({ userId, postId });
    if (isDuplicate) {
      throw new Error('Post is already in favorites');
    }

    // Create a new favorite entry
    const newFavorite = await Favorite.create({ userId, postId });
    return newFavorite;
  } catch (err) {
    console.error(`Error adding favorite post: ${err.message}`);
    throw new Error(err.message);
  }
};

/**
 * Get all favorite posts for a user
 */
const getFavoritePosts = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const favorites = await Favorite.find({ userId }).lean(); // Find favorites for the specific user

    return favorites.map(favorite => ({
      id: favorite._id.toString(),
      userId: favorite.userId.toString(),
      postId: favorite.postId.toString(),
    }));
  } catch (err) {
    throw new Error(`Error fetching favorite posts: ${err.message}`);
  }
};


/**
 * Remove a post from the user's favorites
 */
const removeFavoritePost = async (userId, postId) => {
  try {
    if (!userId || !postId) {
      throw new Error('Both userId and postId are required');
    }

    // Delete the favorite
    const result = await Favorite.deleteOne({ userId, postId });
    if (result.deletedCount === 0) {
      throw new Error('Favorite not found');
    }

    return true;
  } catch (err) {
    console.error(`Error removing favorite post: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = {
  addFavoritePost,
  getFavoritePosts,
  removeFavoritePost,
};
