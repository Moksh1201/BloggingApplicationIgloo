const express = require('express');
const multer = require('multer');
const authenticate = require('../middleware/authMiddleware');
const postController = require('../controllers/postController'); // Import controller
const router = express.Router();

// Multer setup for image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Routes for posts
router.get('/', postController.getPosts); // Get all posts
router.get('/:postId', postController.getPost); // Get a single post by ID
router.post('/', authenticate, upload.array('images', 5), postController.createPost); // Create a new post
router.put('/:postId', authenticate, upload.array('images', 5), postController.updatePost); // Update a post
router.delete('/:postId', authenticate, postController.deletePost); // Delete a post

//by userid
router.get('/user/:userId', authenticate, postController.getPostsByUserId);
// Routes for comments
router.post('/:postId/comments', authenticate, postController.addComment); // Add a comment to a post
router.get('/:postId/comments', postController.getComments); // Get all comments for a post
router.put('/:postId/comments/:commentId', authenticate, postController.updateComment); // Update a comment
router.delete('/:postId/comments/:commentId', authenticate, postController.removeComment); // Remove a comment

// Routes for likes
router.post('/:postId/likes', authenticate, postController.likePost); // Like a post
router.delete('/:postId/likes', authenticate, postController.unlikePost); // Unlike a post
router.get('/:postId/likes', postController.getLikesForPost); // Get likes for a post

module.exports = router;
