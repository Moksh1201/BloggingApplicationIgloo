const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const postsFilePath = path.join(__dirname, '../data/posts.json');

// Helper function to read data from JSON file
const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write data to JSON file
const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

// Create a new post
const createPost = (userId, content, image, title, tags) => {
  const posts = readDataFromFile(postsFilePath);

  const newPost = {
    id: uuidv4(),
    userId,
    content,
    image: image || null,  // Ensure image is null if not provided
    title: title || '',     // Add title with default empty string if not provided
    tags: tags || [],       // Add tags with default empty array if not provided
    created: new Date(),
    comments: [],
    likes: 0,
  };

  posts.push(newPost);
  writeDataToFile(postsFilePath, posts);

  return newPost;
};

// Get all posts
const getPosts = () => {
  return readDataFromFile(postsFilePath);
};

// Get a specific post
const getPost = (id) => {
  const posts = readDataFromFile(postsFilePath);
  return posts.find(p => p.id === id);
};

// Update a post
const updatePost = (id, content, image, title, tags) => {
  const posts = readDataFromFile(postsFilePath);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return null;
  }

  posts[postIndex].content = content;
  if (image !== undefined) {  // Check if image is provided
    posts[postIndex].image = image || null;  // Ensure image is null if not provided
  }
  if (title !== undefined) {
    posts[postIndex].title = title;
  }
  if (tags !== undefined) {
    posts[postIndex].tags = tags;
  }

  writeDataToFile(postsFilePath, posts);

  return posts[postIndex];
};

// Delete a post
const deletePost = (id) => {
  const posts = readDataFromFile(postsFilePath);
  const newPosts = posts.filter(p => p.id !== id);

  if (posts.length === newPosts.length) {
    return false;
  }

  writeDataToFile(postsFilePath, newPosts);
  return true;
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
