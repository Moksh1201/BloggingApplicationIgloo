const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const videoFilePath = path.join(__dirname, '../data/videos.json');

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

    const videos = await readJSONFile(videoFilePath);

    const newVideo = {
      _id: uuidv4(),
      userId,
      title,
      description: description || '',
      videoPath: `/uploads/videos/${req.file.filename}`,
      createdAt: new Date(),
    };

    videos.push(newVideo);

    await writeJSONFile(videoFilePath, videos);
    res.status(201).json(newVideo);
  } catch (err) {
    next(err);
  }
};

const getVideos = async (req, res, next) => {
  try {
    const videos = await readJSONFile(videoFilePath);
    res.json(videos);
  } catch (err) {
    next(err);
  }
};

const getVideoById = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const videos = await readJSONFile(videoFilePath);
    const video = videos.find((v) => v._id === videoId);

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
