const mongoose = require('mongoose');

// Define the schema for the favorite
const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});

// Create the Favorite model
const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
