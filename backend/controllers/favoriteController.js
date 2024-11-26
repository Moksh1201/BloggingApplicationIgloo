const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const favoritesFilePath = path.join(__dirname, '../data/favorites.json');

// Helper function to read data from JSON file
const readDataFromFile = () => {
  const data = fs.readFileSync(favoritesFilePath);
  return JSON.parse(data);
};

// Helper function to write data to JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(favoritesFilePath, JSON.stringify(data, null, 2));
};

const addFavoritePost = (userId, postId) => {
  const favorites = readDataFromFile();

  // Avoid duplicates
  const isDuplicate = favorites.some(fav => fav.userId === userId && fav.postId === postId);
  if (isDuplicate) {
    throw new Error('Post is already in favorites');
  }

  // Create a new favorite entry
  const newFavorite = {
    id: uuidv4(), // Unique ID for this favorite
    userId,
    postId, // Include the postId
  };

  favorites.push(newFavorite); // Save the new entry
  writeDataToFile(favorites); // Write to the JSON file
};


const getFavoritePosts = (userId) => {
  if (!userId) {
    console.error("No userId provided.");
    return [];
  }
  const favorites = readDataFromFile();
  const userFavorites = favorites.filter(fav => fav.userId === userId);
  return userFavorites;
};


const removeFavoritePost = (userId, postId) => {
  const favorites = readDataFromFile();
  const newFavorites = favorites.filter(fav => !(fav.userId === userId && fav.postId === postId));

  if (favorites.length === newFavorites.length) {
    throw new Error('Favorite not found');
  }

  writeDataToFile(newFavorites);
};

module.exports = {
  addFavoritePost,
  getFavoritePosts,
  removeFavoritePost,
};
