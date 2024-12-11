const User = require('../models/user');

const getAllUsers = async () => {
  return await User.find({});
};

const getProfile = async (userId) => {
  return await User.findById(userId);
};

const updateProfile = async (userId, updatedProfile) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error;
  }
};

const followUser = async (userId, followId) => {
  const user = await User.findById(userId);
  const followUser = await User.findById(followId);

  if (!user || !followUser) {
    throw new Error('User(s) not found');
  }

  if (user.following.includes(followId)) {
    throw new Error('Already following this user');
  }

  user.following.push(followId);
  followUser.followers.push(userId);

  await user.save();
  await followUser.save();

  return { message: 'User followed successfully' };
};

const unfollowUser = async (userId, unfollowId) => {
  const user = await User.findById(userId);
  const unfollowUser = await User.findById(unfollowId);

  if (!user || !unfollowUser) {
    throw new Error('User(s) not found');
  }

  if (!user.following.some(id => id.toString() === unfollowId.toString())) {
    throw new Error('You are not following this user');
  }

  user.following = user.following.filter(id => id.toString() !== unfollowId.toString());
  unfollowUser.followers = unfollowUser.followers.filter(id => id.toString() !== userId.toString());

  await user.save();
  await unfollowUser.save();

  const updatedUser = await User.findById(userId);

  return { message: 'User unfollowed successfully', updatedUser };
};


module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  followUser,
  unfollowUser,
};
