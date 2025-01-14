// const express = require('express');
// const authenticate = require('../middleware/authMiddleware');
// const postController = require('../controllers/postController');
// const router = express.Router();

// // Importing the upload middleware from postController
// const { upload } = require('../controllers/postController');

// // Routes for posts
// router.get('/', postController.getPosts);
// router.get('/:postId', postController.getPost);
// router.post('/', authenticate, upload.array('images', 5), postController.createPost);
// router.put('/:postId', authenticate, upload.array('images', 5), postController.updatePost);
// router.delete('/:postId', authenticate, postController.deletePost);

// // Routes for comments
// router.post('/:postId/comments', authenticate, postController.addComment);
// router.get('/:postId/comments', postController.getComments);
// router.put('/:postId/comments/:commentId', authenticate, postController.updateComment);
// router.delete('/:postId/comments/:commentId', authenticate, postController.removeComment);

// // Routes for likes
// router.post('/:postId/likes', authenticate, postController.likePost);
// router.delete('/:postId/likes', authenticate, postController.unlikePost);
// router.get('/:postId/likes', postController.getLikesForPost);

// // Routes to get posts by user ID
// router.get('/user/:userId', authenticate, postController.getPostsByUserId);

// module.exports = router;
const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');
const router = express.Router();

// Importing the upload middleware from postController
const { upload } = require('../controllers/postController');

// Routes for posts
router.get('/', postController.getPosts);
router.get('/:postId', postController.getPost);
router.post('/', authenticate, upload.array('images', 5), postController.createPost);
router.put('/:postId', authenticate, upload.array('images', 5), postController.updatePost);
router.delete('/:postId', authenticate, postController.deletePost);
router.get('/image/:filename', postController.getImage);
// Image retrieval route

// Routes for comments
router.post('/:postId/comments', authenticate, postController.addComment);
router.get('/:postId/comments', postController.getComments);
router.put('/:postId/comments/:commentId', authenticate, postController.updateComment);
router.delete('/:postId/comments/:commentId', authenticate, postController.removeComment);

// Routes for likes
router.post('/:postId/likes', authenticate, postController.likePost);
router.delete('/:postId/likes', authenticate, postController.unlikePost);
router.get('/:postId/likes', postController.getLikesForPost);

// Routes to get posts by user ID
router.get('/user/:userId', authenticate, postController.getPostsByUserId);

module.exports = router;
