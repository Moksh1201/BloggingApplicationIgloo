// const fs = require('fs');
// const path = require('path');
// const usersFilePath = path.join(__dirname, '../data/users.json');

// // Helper function to read data from JSON file
// const readDataFromFile = () => {
//   const data = fs.readFileSync(usersFilePath);
//   return JSON.parse(data);
// };

// // Get all users
// const getAllUsers = () => {
//   const users = readDataFromFile();
//   return users;
// };

// const getProfile = (userId) => {
//   const users = readDataFromFile();
//   const user = users.find(u => u.id === userId);
//   return user;
// };

// const updateProfile = (userId, updatedProfile) => {
//   const users = readDataFromFile();
//   const userIndex = users.findIndex(u => u.id === userId);

//   if (userIndex === -1) {
//     throw new Error('User not found');
//   }

//   users[userIndex] = { ...users[userIndex], ...updatedProfile };
//   fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

//   return users[userIndex];
// };

// module.exports = {
//   getAllUsers,
//   getProfile,
//   updateProfile,
// };
const fs = require('fs');
const path = require('path');
const usersFilePath = path.resolve(__dirname, '../data/users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to users file:', error);
  }
};

const getAllUsers = () => readUsers();

const getProfile = (userId) => {
  const users = readUsers();
  return users.find(user => user.id === userId); // Compare as string
};

const updateProfile = (userId, updatedProfile) => {
  try {
    // Read the current users synchronously
    const users = readUsers();

    // Find the user by ID
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) throw new Error('User not found');

    // Update the user's profile with the provided data
    users[userIndex] = { ...users[userIndex], ...updatedProfile };

    // Write the updated users back to the file
    writeUsers(users);

    // Return the updated user profile
    return users[userIndex];
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error; // Re-throw to allow calling functions to handle it
  }
};


const followUser = (userId, followId) => {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  const followUser = users.find(u => u.id === followId);

  if (!user) throw new Error('User not found');
  if (!followUser) throw new Error('User to follow not found');
  if (user.following?.includes(followId)) throw new Error('Already following this user');

  user.following = user.following || [];
  followUser.followers = followUser.followers || [];

  user.following.push(followId);
  followUser.followers.push(userId);

  writeUsers(users);
  return { message: 'User followed successfully' };
};

// Unfollow user
const unfollowUser = (userId, unfollowId) => {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  const unfollowUser = users.find(u => u.id === unfollowId);

  if (!user) throw new Error('User not found');
  if (!unfollowUser) throw new Error('User to unfollow not found');
  if (!user.following?.includes(unfollowId)) throw new Error('Not following this user');

  user.following = user.following.filter(id => id !== unfollowId);
  unfollowUser.followers = unfollowUser.followers.filter(id => id !== userId);

  writeUsers(users);
  return { message: 'User unfollowed successfully' };
};


module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  followUser,
  unfollowUser,
};