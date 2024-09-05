const fs = require('fs');
const path = require('path');
const favoritesPath = path.resolve(__dirname, '../data/favorites.json');

const readFavorites = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(favoritesPath, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
};

const writeFavorites = (favorites) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(favoritesPath, JSON.stringify(favorites, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getFavoritesByUserId = async (userId) => {
  const favorites = await readFavorites();
  return favorites.filter(fav => fav.userId === userId);
};

const addFavorite = async (newFavorite) => {
  const favorites = await readFavorites();
  favorites.push(newFavorite);
  await writeFavorites(favorites);
};

const removeFavorite = async (userId, postId) => {
  let favorites = await readFavorites();
  favorites = favorites.filter(fav => !(fav.userId === userId && fav.postId === postId));
  await writeFavorites(favorites);
};

module.exports = {
  getFavoritesByUserId,
  addFavorite,
  removeFavorite,
};
