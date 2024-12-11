const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  profilePic: { type: String, default: null },
  isAdmin: { type: Boolean, default: false }, 
  isPremium: { type: Boolean, default: false }, 
  stripeCustomerId: { type: String },
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; 
    delete ret._id; 
    delete ret.__v; 
    return ret;
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
