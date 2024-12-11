const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Admin = require('../models/Admin'); 
const User = require('../models/user');   
const Post = require('../models/Post');  

const SECRET_KEY = "gcr#eH45TU%BNh8$h5T!F765$7B5gh65f@&d4f";
const JWT_SECRET = "vG7yL*4s&uVxwRmd@M!z9^Tj0Q$e6H5";

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins' });
  }
};

const addAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized. Only admins can add other admins.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email or username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
      followers: [],
      following: [],
      isPrivate: false,
    });

    await newAdmin.save();

    return res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Failed to add admin' });
  }
};

const checkIfAdmin = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user && user.isAdmin;
  } catch (err) {
    throw new Error('Failed to check if user is admin');
  }
};

const removeAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await User.findOneAndDelete({ id, isAdmin: true });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    res.status(200).json({ message: 'Admin removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove admin' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (!req.admin.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    if (!req.admin.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

const removePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({ message: 'Post removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove post' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getAdmins,
  addAdmin,
  removeAdmin,
  getAllUsers,
  getAllPosts,
  removePost,
  checkIfAdmin,
  deleteUser,
};
