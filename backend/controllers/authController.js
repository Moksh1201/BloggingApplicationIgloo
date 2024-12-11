const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretKey = 'vG7yL*4s&uVxwRmd@M!z9^Tj0Q$e6H5';

const registerUser = async (userData) => {
  try {
    const { username, email, password, bio = '', profilePic = null } = userData;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('Email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      bio,
      profilePic,
      followers: [],  
      following: []   
    });

    return {
      message: 'User registered successfully',
      user: newUser.toJSON() 
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('User registration failed');
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin, isPremium: user.isPremium},
      secretKey,
      { expiresIn: '1h' }
    );

    return { user, token };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Login failed');
  }
};

module.exports = {
  registerUser,
  loginUser
};
