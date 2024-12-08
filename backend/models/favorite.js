// const mongoose = require('mongoose');

// // Define the schema for the favorite
// const favoriteSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
// });

// // Apply the toJSON transformation at the schema level
// favoriteSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret.id = ret._id; // Rename _id to id
//     delete ret._id; // Remove the original _id field
//     delete ret.__v; // Remove the __v field
//     return ret;
//   }
// });

// // Create the Favorite model
// const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);

// module.exports = Favorite;
const mongoose = require('mongoose');

// Define the schema for the favorite
const favoriteSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Apply the toJSON transformation to rename the _id field to id
favoriteSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); // Rename _id to id
    delete ret.__v; // Remove the __v field
    delete ret._id; // Remove the original _id field
    return ret;
  },
});

// Create the Favorite model
const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
