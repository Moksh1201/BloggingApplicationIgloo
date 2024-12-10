const express = require('express');
const multer = require('multer');
const { uploadVideo, getVideos, getVideoById } = require('../controllers/videoController');
const validatePremiumUser = require('../middleware/validatePremiumUser');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer configuration for file upload
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/'); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storage: videoStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/mov'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid video file type'));
    }
  },
});

// Routes
router.post('/upload', authMiddleware, validatePremiumUser, upload.single('video'), uploadVideo); 
router.get('/', authMiddleware, validatePremiumUser, getVideos);
router.get('/:videoId', authMiddleware, validatePremiumUser, getVideoById);


module.exports = router;
