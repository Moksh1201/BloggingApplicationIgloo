const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

favoriteSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); 
    delete ret.__v; 
    delete ret._id; 
    return ret;
  },
});

const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
