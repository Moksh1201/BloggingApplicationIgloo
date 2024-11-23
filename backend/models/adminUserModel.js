const path = require('path');
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const adminUsersPath = path.resolve(__dirname, '../data/admin.json');
const postsPath = path.resolve(__dirname, '../data/posts.json');
const usersPath = path.resolve(__dirname, '../data/users.json');

// Fetching all admin users
const getAllAdminUsers = async () => {
  const adminUsers = await readJSONFile(adminUsersPath);
  return adminUsers;
};

// Creating a new admin user
const createAdminUser = async (newAdminUser) => {
  const adminUsers = await readJSONFile(adminUsersPath);
  adminUsers.push(newAdminUser);
  await writeJSONFile(adminUsersPath, adminUsers);
};

// Deleting an admin user by ID
const deleteAdminUser = async (id) => {
  let adminUsers = await readJSONFile(adminUsersPath);
  adminUsers = adminUsers.filter(user => user.id !== id);
  await writeJSONFile(adminUsersPath, adminUsers);
};

// Fetching all users
const getAllUsers = async () => {
  const users = await readJSONFile(usersPath);
  return users;
};

// Fetching all posts
const getAllPosts = async () => {
  const posts = await readJSONFile(postsPath);
  return posts;
};

// Deleting a user
const deleteUser = async (id) => {
  let users = await readJSONFile(usersPath);
  users = users.filter(user => user.id !== id);
  await writeJSONFile(usersPath, users);
};

// Deleting a post
const deletePost = async (id) => {
  let posts = await readJSONFile(postsPath);
  posts = posts.filter(post => post.id !== id);
  await writeJSONFile(postsPath, posts);
};

module.exports = {
  getAllAdminUsers,
  createAdminUser,
  deleteAdminUser,
  getAllUsers,
  getAllPosts,
  deleteUser,
  deletePost,
};