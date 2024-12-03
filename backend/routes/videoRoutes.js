const express = require('express');
const { uploadVideo, getVideos, getVideoById } = require('../controllers/videoController');
const { validatePremiumUser } = require('../middleware/validatePremiumUser');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const router = express.Router();

router.post('/upload', validatePremiumUser,authenticateAdmin, upload.single('video'), uploadVideo);
router.get('/', validatePremiumUser,authenticateAdmin,getVideos);
router.get('/:videoId', validatePremiumUser, authenticateAdmin, getVideoById);

module.exports = router;
