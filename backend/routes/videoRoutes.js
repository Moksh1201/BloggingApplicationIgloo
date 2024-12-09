const express = require('express');
const multer = require('multer');

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
  
const { uploadVideo, getVideos, getVideoById } = require('../controllers/videoController');
const { validatePremiumUser } = require('../middleware/validatePremiumUser');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const router = express.Router();

router.post('/upload', upload.single('video'), async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded' });
      }
  
      const { userId, title, description } = req.body;
      if (!userId || !title) {
        return res.status(400).json({ error: 'userId and title are required' });
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Save video data in the database
      const newVideo = new Video({
        userId,
        title,
        description: description || '',
        videoPath: `/uploads/videos/${req.file.filename}`,  // The path stored in MongoDB
        createdAt: new Date(),
      });
  
      await newVideo.save();
      res.status(201).json(newVideo);  // Return the newly saved video object
    } catch (error) {
      next(error);
    }
  });
  
  
router.get('/', getVideos);
router.get('/:videoId',  authenticateAdmin, getVideoById);

module.exports = router;
