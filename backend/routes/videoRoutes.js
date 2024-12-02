const express = require('express');
const { uploadVideo, getVideos, getVideoById } = require('../controllers/videoController');
const { validatePremiumUser } = require('../middleware/validatePremiumUser');

const router = express.Router();

router.post('/upload', validatePremiumUser, upload.single('video'), uploadVideo);
router.get('/', getVideos);
router.get('/:videoId', getVideoById);

module.exports = router;
