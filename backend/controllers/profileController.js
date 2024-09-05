const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read data from JSON file
const readDataFromFile = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Get all users
const getAllUsers = () => {
  const users = readDataFromFile();
  return users;
};

const getProfile = (userId) => {
  const users = readDataFromFile();
  const user = users.find(u => u.id === userId);
  return user;
};

const updateProfile = (userId, updatedProfile) => {
  const users = readDataFromFile();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  users[userIndex] = { ...users[userIndex], ...updatedProfile };
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  return users[userIndex];
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
};
