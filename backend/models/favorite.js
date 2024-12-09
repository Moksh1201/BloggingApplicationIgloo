const mongoose = require('mongoose');

// Define the schema for the favorite
const favoriteSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Apply the toJSON transformation to rename the _id field to id
favoriteSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); 
    delete ret.__v; 
    delete ret._id; 
    return ret;
  },
});

// Create the Favorite model
const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
