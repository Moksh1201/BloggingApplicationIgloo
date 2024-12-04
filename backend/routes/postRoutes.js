// const express = require('express');
// const multer = require('multer');
// const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
// const {
//   getPosts,
//   getPost,
//   createPost,
//   updatePost,
//   deletePost,
//   addComment,
//   getComments,
//   likePost,
//   unlikePost,
//   getLikesForPost,
//   removeComment,
//   updateComment,
// } = require('../controllers/postController');
// const authenticate = require('../middleware/authMiddleware');
// const path = require('path'); 
// const uuidv4 = require('uuid').v4; 


// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Route to get a post by ID
// router.get('/:postId', async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const posts = await readJSONFile(postsFilePath);
//     const post = posts.find(p => p._id === postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.json(post);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post(
//   '/',
//   authenticate,
//   (req, res, next) => {
//     upload.array('images', 5)(req, res, (err) => {  
//       console.log("Received request:", req.body, req.files); 
//       if (err) {
//         if (err instanceof multer.MulterError) {
//           return res.status(400).send(`Multer error: ${err.message}`);
//         }
//         return res.status(400).send(`Error: ${err.message}`);
//       }
//       next();
//     });
//   },
//   createPost
// );



// // Route to get all posts
// router.get('/', getPosts);

// // Route to get posts by userId
// router.get('/user/:userId',authenticate, async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const posts = await readJSONFile(postsFilePath);
//     const userPosts = posts.filter(post => post.userId === userId);
//     res.status(200).json(userPosts);
//   } catch (err) {
//     console.error('Error in getPostsByUserId route:', err);
//     next(err);
//   }
// });

// // Route to update a post by ID
// router.put('/:postId', authenticate, updatePost);

// // Route to delete a post by ID
// router.delete('/:postId', authenticate, deletePost);

// // Route to add a comment to a post
// router.post('/:postId/comments', authenticate,addComment);

// // Route to remove a comment from a post
// router.delete('/:postId/comments/:commentId', authenticate, removeComment);

// // Route to update a comment
// router.put('/:postId/comments/:commentId', authenticate, updateComment);

// // Route to get all comments for a post
// router.get('/:postId/comments', getComments);

// // Route to like a post
// router.post('/:postId/likes', authenticate, async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ error: 'userId is required' });
//     }

//     const likes = await readJSONFile(likesFilePath);
//     const existingLike = likes.find(like => like.postId === postId && like.userId === userId);

//     if (existingLike) {
//       return res.status(400).json({ error: 'User has already liked this post' });
//     }

//     const newLike = {
//       _id: uuidv4(),
//       postId,
//       userId,
//       createdAt: new Date(),
//     };

//     likes.push(newLike);
//     await writeJSONFile(likesFilePath, likes);

//     res.status(201).json(newLike);
//   } catch (err) {
//     console.error('Error in likePost route:', err);
//     next(err);
//   }
// });

// // Route to unlike a post
// router.delete('/:postId/likes', authenticate, async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ error: 'userId is required' });
//     }

//     const likes = await readJSONFile(likesFilePath);
//     const updatedLikes = likes.filter(like => !(like.postId === postId && like.userId === userId));
//     await writeJSONFile(likesFilePath, updatedLikes);
//     res.status(204).send();
//   } catch (err) {
//     console.error('Error in unlikePost route:', err);
//     next(err);
//   }
// });

// // Route to get all likes for a post
// router.get('/:postId/likes', async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const likes = await readJSONFile(likesFilePath);
//     const postLikes = likes.filter(like => like.postId === postId);
//     res.status(200).json(postLikes);
//   } catch (err) {
//     console.error('Error in getLikesForPost route:', err);
//     next(err);
//   }
// });

// // Route to get posts by title
// router.get('/search/title/:title', authenticate, async (req, res, next) => {
//   try {
//     const { title } = req.params;
//     const posts = await readJSONFile(postsFilePath);
//     const filteredPosts = posts.filter(post => post.title && post.title.toLowerCase().includes(title.toLowerCase()));
//     res.status(200).json(filteredPosts);
//   } catch (err) {
//     console.error('Error in getPostsByTitle route:', err);
//     next(err);
//   }
// });

// // Route to get posts by tag
// router.get('/search/tag/:tag', authenticate, async (req, res, next) => {
//   try {
//     const { tag } = req.params;
//     const posts = await readJSONFile(postsFilePath);
//     const filteredPosts = posts.filter(post => post.tags && post.tags.includes(tag));
//     res.status(200).json(filteredPosts);
//   } catch (err) {
//     console.error('Error in getPostsByTag route:', err);
//     next(err);
//   }
// });

// // Route to get latest posts
// router.get('/posts/latest', async (req, res) => {
//   try {
//     const posts = await readJSONFile(postsFilePath);
//     posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     res.json(posts.slice(0, 10));
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching posts' });
//   }
// });

// module.exports = router;
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
