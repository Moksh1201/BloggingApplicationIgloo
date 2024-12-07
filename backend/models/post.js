const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  username: { type: String, required: true },
  content: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
