const mongoose = require('mongoose');

// Define schemas
const adminSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
});

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
});

const postSchema = new mongoose.Schema({
  id: String,
  userId: String,
  content: String,
  image: String,
  title: String,
  tags: [String],
  created: Date,
  comments: [String],
  likes: Number,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

const getAllAdminUsers = async () => await Admin.find({});
const createAdminUser = async (newAdminUser) => await Admin.create(newAdminUser);
const deleteAdminUser = async (id) => await Admin.findOneAndDelete({ id });

const getAllUsers = async () => await User.find({});
const deleteUser = async (id) => await User.findOneAndDelete({ id });

const getAllPosts = async () => await Post.find({});
const deletePost = async (id) => await Post.findOneAndDelete({ id });

module.exports = {
  getAllAdminUsers,
  createAdminUser,
  deleteAdminUser,
  getAllUsers,
  deleteUser,
  getAllPosts,
  deletePost,
};
