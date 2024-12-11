const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true }, 
  title: { type: String, required: true },
  description: { type: String, default: '' },
  videoPath: { type: String, required: true },
  tags: { type: [String], default: [] }, 
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
