const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const Video = require('../models/video'); 
const User = require('../models/user');  

// Multer storage for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/mov'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid video file type'));
    }
  },
});

// Controller functions
const uploadVideo = async (req, res, next) => {
  try {
    const { userId, title, description } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ error: 'userId and title are required' });
    }

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newVideo = new Video({
      userId,
      title,
      description: description || '',
      videoPath: `/uploads/videos/${req.file.filename}`,
      createdAt: new Date(),
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    next(err);
  }
};

const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({});
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
