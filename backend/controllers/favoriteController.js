const Favorite = require('../models/favorite'); 
const Post = require('../models/Post'); 


const addFavoritePost = async (userId, postId) => {
  try {
    if (!userId || !postId) {
      throw new Error('Both userId and postId are required');
    }

    const postExists = await Post.findById(postId);
    if (!postExists) {
      throw new Error('Post not found');
    }

    const isDuplicate = await Favorite.findOne({ userId, postId });
    if (isDuplicate) {
      throw new Error('Post is already in favorites');
    }

    const newFavorite = await Favorite.create({ userId, postId });
    return newFavorite;
  } catch (err) {
    console.error(`Error adding favorite post: ${err.message}`);
    throw new Error(err.message);
  }
};

const getFavoritePosts = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const favorites = await Favorite.find({ userId }).lean(); 

    return favorites.map(favorite => ({
      id: favorite._id.toString(),
      userId: favorite.userId.toString(),
      postId: favorite.postId.toString(),
    }));
  } catch (err) {
    throw new Error(`Error fetching favorite posts: ${err.message}`);
  }
};



const removeFavoritePost = async (userId, postId) => {
  try {
    if (!userId || !postId) {
      throw new Error('Both userId and postId are required');
    }

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
