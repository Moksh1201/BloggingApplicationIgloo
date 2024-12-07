const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const Post = require('../models/Post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user'); 

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type'));
//     }
//   },
// });

// Controller functions

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('userId', 'username');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('userId', 'username');
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Get posts by userId
const getPostsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).populate('userId', 'username');
    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for this user' });
    }
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { userId, content, title, tags,username } = req.body;

    if (!userId || !content || !title || !username) {
      return res.status(400).json({ error: 'userId, content, and title are required' });
    }

    const images = req.files && req.files.length > 0
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    const newPost = new Post({
      userId,
      username,
      content,
      title,
      tags: tags || [],
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, title, tags } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : post.images;

    post.content = content || post.content;
    post.title = title || post.title;
    post.tags = tags || post.tags;
    post.images = images;
    post.updatedAt = new Date();

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await Post.deleteOne({ _id: postId });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Post not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;
    const userId = req.user?.id;

    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newComment = new Comment({
      postId,
      userId,
      username: user.username,
      content,
      parentCommentId: parentCommentId || null,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId, parentCommentId: null }).populate('userId', 'username');
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const comment = await Comment.findOne({ postId, _id: commentId });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.content = content;
    comment.updatedAt = new Date();

    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

const removeComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const result = await Comment.deleteOne({ postId, _id: commentId });

    if (result.deletedCount === 0) return res.status(404).json({ error: "Comment not found" });

    // Optionally, delete nested replies here
    await Comment.deleteMany({ parentCommentId: commentId });

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

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) return res.status(400).json({ error: 'Post already liked' });

    const newLike = new Like({ postId, userId });
    await newLike.save();

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

    await Like.deleteOne({ postId, userId });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getLikesForPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ postId }).populate('userId', 'username');
    res.json(likes);
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
  updateComment,
  removeComment,
  likePost,
  unlikePost,
  getLikesForPost,
  getPostsByUserId,
};
