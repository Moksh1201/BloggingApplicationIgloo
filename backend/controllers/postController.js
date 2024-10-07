// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs').promises;
// const path = require('path');

// // File paths
// const postsFilePath = path.join(__dirname, '../data/posts.json');
// const commentsFilePath = path.join(__dirname, '../data/comments.json');
// const likesFilePath = path.join(__dirname, '../data/likes.json');

// // Helper functions for reading and writing files
// async function readJSONFile(filePath) {
//   try {
//     const data = await fs.readFile(filePath, 'utf8');
//     return JSON.parse(data);
//   } catch (err) {
//     throw new Error(`Failed to read file: ${filePath}`);
//   }
// }

// async function writeJSONFile(filePath, data) {
//   try {
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
//   } catch (err) {
//     throw new Error(`Failed to write file: ${filePath}`);
//   }
// }

// // Controller functions
// const getPosts = async (req, res, next) => {
//   try {
//     const posts = await readJSONFile(postsFilePath);
//     res.json(posts);
//   } catch (err) {
//     next(err); // Pass error to the next middleware
//   }
// };

// const getPost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const posts = await readJSONFile(postsFilePath);
//     const post = posts.find(p => p._id === postId);
//     if (!post) return next(new Error("Post not found")); // Handle not found error
//     res.json(post);
//   } catch (err) {
//     next(err);
//   }
// };

// const createPost = async (req, res, next) => {
//   try {
//     const { userId, content, image, title, tags } = req.body;

//     if (!userId || !content || !title) {
//       return res.status(400).json({ error: 'userId, content, and title are required' });
//     }

//     const posts = await readJSONFile(postsFilePath);

//     const newPost = {
//       _id: uuidv4(),
//       userId,
//       content,
//       image: image || null,
//       title,
//       tags: tags ? JSON.parse(tags) : [], // Handle optional tags as an array
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     posts.push(newPost);
//     await writeJSONFile(postsFilePath, posts);

//     res.status(201).json(newPost);
//   } catch (err) {
//     console.error("Error in createPost:", err); // Log full error
//     next(err);
//   }
// };

// const updatePost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { content, image, title, tags } = req.body;

//     const posts = await readJSONFile(postsFilePath);
//     const postIndex = posts.findIndex(p => p._id === postId);

//     if (postIndex === -1) return next(new Error("Post not found"));

//     posts[postIndex] = {
//       ...posts[postIndex],
//       content,
//       image,
//       title: title || posts[postIndex].title,
//       tags: tags || posts[postIndex].tags,
//       updatedAt: new Date(),
//     };

//     await writeJSONFile(postsFilePath, posts);
//     res.json(posts[postIndex]);
//   } catch (err) {
//     next(err);
//   }
// };

// const deletePost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;

//     let posts = await readJSONFile(postsFilePath);
//     posts = posts.filter(p => p._id !== postId);

//     await writeJSONFile(postsFilePath, posts);
//     res.status(204).send(); // No content to send back
//   } catch (err) {
//     next(err);
//   }
// };

// const addComment = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { userId, content } = req.body;

//     if (!userId || !content) {
//       return res.status(400).json({ error: 'userId and content are required' });
//     }

//     const posts = await readJSONFile(postsFilePath);
//     const post = posts.find(p => p._id === postId);

//     if (!post) return next(new Error("Post not found"));

//     const comments = await readJSONFile(commentsFilePath);
//     const newComment = {
//       _id: uuidv4(),
//       postId,
//       userId,
//       content,
//       createdAt: new Date(),
//     };

//     comments.push(newComment);
//     await writeJSONFile(commentsFilePath, comments);

//     // Optional: Populate author details if needed
//     res.status(201).json(newComment);
//   } catch (err) {
//     next(err);
//   }
// };

// const getComments = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const comments = await readJSONFile(commentsFilePath);
//     const postComments = comments.filter(c => c.postId === postId);

//     // Optional: Add user following status if needed
//     res.json(postComments);
//   } catch (err) {
//     next(err);
//   }
// };

// const removeComment = async (req, res, next) => {
//   try {
//     const { postId, commentId } = req.params;

//     const posts = await readJSONFile(postsFilePath);
//     const post = posts.find(p => p._id === postId);
//     if (!post) return next(new Error("Post not found"));

//     let comments = await readJSONFile(commentsFilePath);
//     const comment = comments.find(c => c._id === commentId && c.postId === postId);

//     if (!comment) return next(new Error("Comment not found"));
//     if (comment.userId !== req.user.userId) return next(new Error("Only the author can delete the comment"));

//     comments = comments.filter(c => c._id !== commentId);
//     await writeJSONFile(commentsFilePath, comments);

//     res.status(204).send(); // No content to send back
//   } catch (err) {
//     next(err);
//   }
// };

// const likePost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { userId } = req.body;

//     // Check if userId is provided
//     if (!userId) {
//       return res.status(400).json({ error: 'userId is required' });
//     }

//     // Read existing likes
//     const likes = await readJSONFile(likesFilePath);

//     // Read posts to check if the post exists
//     const posts = await readJSONFile(postsFilePath);
//     const post = posts.find(p => p._id === postId);

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     // Check if the post is already liked by this user
//     const alreadyLiked = likes.some(l => l.postId === postId && l.userId === userId);
//     if (alreadyLiked) {
//       return res.status(400).json({ error: 'Post already liked' });
//     }

//     // Create a new like entry
//     const newLike = {
//       _id: uuidv4(),
//       postId,
//       userId,
//       createdAt: new Date(),
//     };

//     // Add new like to the likes list
//     likes.push(newLike);
//     await writeJSONFile(likesFilePath, likes);

//     // Send response with new like
//     res.status(201).json(newLike);
//   } catch (err) {
//     next(err);
//   }
// };

// const unlikePost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ error: 'userId is required' });
//     }

//     let likes = await readJSONFile(likesFilePath);
//     likes = likes.filter(l => !(l.postId === postId && l.userId === userId));

//     await writeJSONFile(likesFilePath, likes);

//     res.status(204).send(); // No content to send back
//   } catch (err) {
//     next(err);
//   }
// };

// const getLikesForPost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const likes = await readJSONFile(likesFilePath);
//     const postLikes = likes.filter(l => l.postId === postId);
//     res.json(postLikes);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   getPosts,
//   getPost,
//   createPost,
//   updatePost,
//   deletePost,
//   addComment,
//   getComments,
//   removeComment,
//   likePost,
//   unlikePost,
//   getLikesForPost,
// };
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

// File paths
const postsFilePath = path.join(__dirname, '../data/posts.json');
const commentsFilePath = path.join(__dirname, '../data/comments.json');
const likesFilePath = path.join(__dirname, '../data/likes.json');

// Helper functions for reading and writing files
async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Failed to read file: ${filePath}. Error: ${err.message}`);
  }
}

async function writeJSONFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    throw new Error(`Failed to write file: ${filePath}. Error: ${err.message}`);
  }
}

// Controller functions
const getPosts = async (req, res, next) => {
  try {
    const posts = await readJSONFile(postsFilePath);
    res.json(posts);
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
};

const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const posts = await readJSONFile(postsFilePath);
    const post = posts.find(p => p._id === postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { userId, content, title, image, tags } = req.body;

    if (!userId || !content || !title) {
      return res.status(400).json({ error: 'userId, content, and title are required' });
    }

    const posts = await readJSONFile(postsFilePath);

    const newPost = {
      _id: uuidv4(),
      userId,
      content,
      image: image || null,
      title,
      tags: tags || '',
      updatedAt: new Date(),
    };

    posts.push(newPost);
    await writeJSONFile(postsFilePath, posts);

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error in createPost:", err);
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, image, title, tags } = req.body;

    const posts = await readJSONFile(postsFilePath);
    const postIndex = posts.findIndex(p => p._id === postId);

    if (postIndex === -1) return res.status(404).json({ error: "Post not found" });

    posts[postIndex] = {
      ...posts[postIndex],
      content,
      image,
      title: title || posts[postIndex].title,
      tags: tags || posts[postIndex].tags,
      updatedAt: new Date(),
    };

    await writeJSONFile(postsFilePath, posts);
    res.json(posts[postIndex]);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    let posts = await readJSONFile(postsFilePath);
    posts = posts.filter(p => p._id !== postId);

    await writeJSONFile(postsFilePath, posts);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }

    const posts = await readJSONFile(postsFilePath);
    const post = posts.find(p => p._id === postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const comments = await readJSONFile(commentsFilePath);
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
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await readJSONFile(commentsFilePath);
    const postComments = comments.filter(c => c.postId === postId);
    res.json(postComments);
  } catch (err) {
    next(err);
  }
};

const removeComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const posts = await readJSONFile(postsFilePath);
    const post = posts.find(p => p._id === postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    let comments = await readJSONFile(commentsFilePath);
    const comment = comments.find(c => c._id === commentId && c.postId === postId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.userId !== req.user.userId) return res.status(403).json({ error: "Only the author can delete the comment" });

    comments = comments.filter(c => c._id !== commentId);
    await writeJSONFile(commentsFilePath, comments);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const likes = await readJSONFile(likesFilePath);
    const posts = await readJSONFile(postsFilePath);
    const post = posts.find(p => p._id === postId);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    const alreadyLiked = likes.some(l => l.postId === postId && l.userId === userId);
    if (alreadyLiked) return res.status(400).json({ error: 'Post already liked' });

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
    next(err);
  }
};

const unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    let likes = await readJSONFile(likesFilePath);
    likes = likes.filter(l => !(l.postId === postId && l.userId === userId));

    await writeJSONFile(likesFilePath, likes);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getLikesForPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const likes = await readJSONFile(likesFilePath);
    const postLikes = likes.filter(l => l.postId === postId);
    res.json(postLikes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  getComments,
  removeComment,
  likePost,
  unlikePost,
  getLikesForPost,
};

