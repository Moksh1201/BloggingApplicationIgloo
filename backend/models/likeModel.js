const fs = require('fs');
const path = require('path');

// Path to the JSON file where liked posts are stored
const LIKED_POSTS_FILE = path.join(__dirname, '..', 'data', 'likedPosts.json');

// Helper function to read the liked posts from the file
const readLikedPosts = () => {
  if (!fs.existsSync(LIKED_POSTS_FILE)) {
    fs.writeFileSync(LIKED_POSTS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(LIKED_POSTS_FILE);
  return JSON.parse(data);
};

// Helper function to write the liked posts to the file
const writeLikedPosts = (likedPosts) => {
  fs.writeFileSync(LIKED_POSTS_FILE, JSON.stringify(likedPosts, null, 2));
};

// Function to add a liked post
const addLikedPost = (userId, postId) => {
  const likedPosts = readLikedPosts();
  const existingLike = likedPosts.find(like => like.userId === userId && like.postId === postId);
  
  if (existingLike) {
    throw new Error('Post already liked by user');
  }

  likedPosts.push({ userId, postId });
  writeLikedPosts(likedPosts);
};

// Function to remove a liked post
const removeLikedPost = (userId, postId) => {
  let likedPosts = readLikedPosts();
  likedPosts = likedPosts.filter(like => !(like.userId === userId && like.postId === postId));
  writeLikedPosts(likedPosts);
};

// Function to get all liked posts for a user
const getLikedPostsByUser = (userId) => {
  const likedPosts = readLikedPosts();
  return likedPosts.filter(like => like.userId === userId);
};

// Function to check if a post is liked by a user
const isPostLikedByUser = (userId, postId) => {
  const likedPosts = readLikedPosts();
  return likedPosts.some(like => like.userId === userId && like.postId === postId);
};

module.exports = {
  addLikedPost,
  removeLikedPost,
  getLikedPostsByUser,
  isPostLikedByUser,
};
