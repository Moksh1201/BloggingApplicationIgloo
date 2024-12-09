const Video = require('../models/video'); 
const User = require('../models/user');

// Controller functions
const uploadVideo = async (req, res, next) => {
  try {
    const { userId, username, title, description, tags } = req.body;

    if (!userId || !title || !username) {
      return res.status(400).json({ error: 'userId, title, and username are required' });
    }

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    // Create a new video document
    const newVideo = new Video({
      userId,
      username,
      title,
      description: description || '',
      tags: tags ? tags.split(",") : [], // Convert string to array
      videoPath: `/uploads/videos/${req.file.filename}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    next(err);
  }
};



const getVideos = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const videos = await Video.find({})
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(videos);
  } catch (err) {
    next(err);
  }
};

const getVideoById = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) return res.status(404).json({ error: 'Video not found' });

    res.json(video);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadVideo,
  getVideos,
  getVideoById,
};
