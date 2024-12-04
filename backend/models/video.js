const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  videoPath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
