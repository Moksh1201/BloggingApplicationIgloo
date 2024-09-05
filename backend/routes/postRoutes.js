// const express = require('express');
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
// } = require('../controllers/postController');
// const authenticate = require('../middleware/authMiddleware');
// const path = require('path'); // Import path module
// const uuidv4 = require('uuid').v4; // Import uuid

// // File paths
// const postsFilePath = path.join(__dirname, '../data/posts.json');
// const commentsFilePath = path.join(__dirname, '../data/comments.json');
// const likesFilePath = path.join(__dirname, '../data/likes.json');

// const router = express.Router();

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

// // Route to create a new post
// router.post('/', authenticate, createPost);

// // Route to get all posts
// router.get('/', getPosts);



// // Route to update a post by ID
// router.put('/:postId', authenticate, updatePost);

// // Route to delete a post by ID
// router.delete('/:postId', authenticate, deletePost);

// // Route to add a comment to a post
// router.post('/:postId/comments', authenticate, async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { userId, content } = req.body;

//     if (!userId || !content) {
//       return res.status(400).json({ error: 'userId and content are required' });
//     }

//     const comments = await readJSONFile(commentsFilePath);
//     const post = await readJSONFile(postsFilePath).then(posts => posts.find(p => p._id === postId));

//     if (!post) return next(new Error("Post not found"));

//     const newComment = {
//       _id: uuidv4(),
//       postId,
//       userId,
//       content,
//       createdAt: new Date(),
//     };

//     comments.push(newComment);
//     await writeJSONFile(commentsFilePath, comments);

//     res.status(201).json(newComment);
//   } catch (err) {
//     console.error('Error in addComment route:', err);
//     next(err);
//   }
// });

// // Route to remove a comment from a post
// router.delete('/:postId/comments/:commentId', authenticate, async (req, res, next) => {
//   try {
//     const { postId, commentId } = req.params;
//     const comments = await readJSONFile(commentsFilePath);
//     const updatedComments = comments.filter(c => !(c.postId === postId && c._id === commentId));
//     await writeJSONFile(commentsFilePath, updatedComments);
//     res.status(204).send();
//   } catch (err) {
//     console.error('Error in deleteComment route:', err);
//     next(err);
//   }
// });

// router.put('/:postId/comments/:commentId', authenticate, async (req, res, next) => {
//   try {
//     const { postId, commentId } = req.params;
//     const { content } = req.body;

//     if (!content) {
//       return res.status(400).json({ error: 'Content is required' });
//     }

//     const comments = await readJSONFile(commentsFilePath);
//     const commentIndex = comments.findIndex(c => c.postId === postId && c._id === commentId);

//     if (commentIndex === -1) {
//       return res.status(404).json({ error: 'Comment not found' });
//     }

//     comments[commentIndex] = {
//       ...comments[commentIndex],
//       content,
//       updatedAt: new Date(),
//     };

//     await writeJSONFile(commentsFilePath, comments);
//     res.status(200).json(comments[commentIndex]);
//   } catch (err) {
//     console.error('Error in updateComment route:', err);
//     next(err);
//   }
// });
// // Route to get all comments for a post
// router.get('/:postId/comments', getComments);

// // Route to like a post
// router.post('/:postId/likes', authenticate, async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { userId } = req.body;

//     // Log the token and userId
//     console.log('Token from request:', req.headers.authorization);
//     console.log('UserId from request body:', userId);

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
// router.get('/search/title/:title', async (req, res, next) => {
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
// router.get('/search/tag/:tag', async (req, res, next) => {
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
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  getComments,
  likePost,
  unlikePost,
  getLikesForPost,
} = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');
const path = require('path'); // Import path module
const uuidv4 = require('uuid').v4; // Import uuid

// File paths
const postsFilePath = path.join(__dirname, '../data/posts.json');
const commentsFilePath = path.join(__dirname, '../data/comments.json');
const likesFilePath = path.join(__dirname, '../data/likes.json');

const router = express.Router();

// Route to get a post by ID
router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const posts = await readJSONFile(postsFilePath);
    const post = posts.find(p => p._id === postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Route to create a new post
router.post('/', authenticate, createPost);

// Route to get all posts
router.get('/', getPosts);

// Route to get posts by userId
router.get('/user/:userId',authenticate, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await readJSONFile(postsFilePath);
    const userPosts = posts.filter(post => post.userId === userId);
    res.status(200).json(userPosts);
  } catch (err) {
    console.error('Error in getPostsByUserId route:', err);
    next(err);
  }
});

// Route to update a post by ID
router.put('/:postId', authenticate, updatePost);

// Route to delete a post by ID
router.delete('/:postId', authenticate, deletePost);

// Route to add a comment to a post
router.post('/:postId/comments', authenticate, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }

    const comments = await readJSONFile(commentsFilePath);
    const post = await readJSONFile(postsFilePath).then(posts => posts.find(p => p._id === postId));

    if (!post) return next(new Error("Post not found"));

    const newComment = {
      _id: uuidv4(),
      postId,
      userId,
      content,
      createdAt: new Date(),
    };

    comments.push(newComment);
    await writeJSONFile(commentsFilePath, comments);

    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error in addComment route:', err);
    next(err);
  }
});

// Route to remove a comment from a post
router.delete('/:postId/comments/:commentId', authenticate, async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const comments = await readJSONFile(commentsFilePath);
    const updatedComments = comments.filter(c => !(c.postId === postId && c._id === commentId));
    await writeJSONFile(commentsFilePath, updatedComments);
    res.status(204).send();
  } catch (err) {
    console.error('Error in deleteComment route:', err);
    next(err);
  }
});

// Route to update a comment
router.put('/:postId/comments/:commentId', authenticate, async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const comments = await readJSONFile(commentsFilePath);
    const commentIndex = comments.findIndex(c => c.postId === postId && c._id === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comments[commentIndex] = {
      ...comments[commentIndex],
      content,
      updatedAt: new Date(),
    };

    await writeJSONFile(commentsFilePath, comments);
    res.status(200).json(comments[commentIndex]);
  } catch (err) {
    console.error('Error in updateComment route:', err);
    next(err);
  }
});

// Route to get all comments for a post
router.get('/:postId/comments', getComments);

// Route to like a post
router.post('/:postId/likes', authenticate, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const likes = await readJSONFile(likesFilePath);
    const existingLike = likes.find(like => like.postId === postId && like.userId === userId);

    if (existingLike) {
      return res.status(400).json({ error: 'User has already liked this post' });
    }

    const newLike = {
      _id: uuidv4(),
      postId,
      userId,
      createdAt: new Date(),
    };

    likes.push(newLike);
    await writeJSONFile(likesFilePath, likes);

    res.status(201).json(newLike);
  } catch (err) {
    console.error('Error in likePost route:', err);
    next(err);
  }
});

// Route to unlike a post
router.delete('/:postId/likes', authenticate, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const likes = await readJSONFile(likesFilePath);
    const updatedLikes = likes.filter(like => !(like.postId === postId && like.userId === userId));
    await writeJSONFile(likesFilePath, updatedLikes);
    res.status(204).send();
  } catch (err) {
    console.error('Error in unlikePost route:', err);
    next(err);
  }
});

// Route to get all likes for a post
router.get('/:postId/likes', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const likes = await readJSONFile(likesFilePath);
    const postLikes = likes.filter(like => like.postId === postId);
    res.status(200).json(postLikes);
  } catch (err) {
    console.error('Error in getLikesForPost route:', err);
    next(err);
  }
});

// Route to get posts by title
router.get('/search/title/:title', async (req, res, next) => {
  try {
    const { title } = req.params;
    const posts = await readJSONFile(postsFilePath);
    const filteredPosts = posts.filter(post => post.title && post.title.toLowerCase().includes(title.toLowerCase()));
    res.status(200).json(filteredPosts);
  } catch (err) {
    console.error('Error in getPostsByTitle route:', err);
    next(err);
  }
});

// Route to get posts by tag
router.get('/search/tag/:tag', async (req, res, next) => {
  try {
    const { tag } = req.params;
    const posts = await readJSONFile(postsFilePath);
    const filteredPosts = posts.filter(post => post.tags && post.tags.includes(tag));
    res.status(200).json(filteredPosts);
  } catch (err) {
    console.error('Error in getPostsByTag route:', err);
    next(err);
  }
});

// Route to get latest posts
router.get('/posts/latest', async (req, res) => {
  try {
    const posts = await readJSONFile(postsFilePath);
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(posts.slice(0, 10));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

module.exports = router;
