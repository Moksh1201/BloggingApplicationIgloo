const mongoose = require('mongoose');
const { createModel } = require('mongoose-gridfs');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const Post = require('../models/Post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user');

// MongoDB Atlas connection URI
const mongoURI = process.env.MONGO_Atlas;

// Initialize Mongoose connection
const connection = mongoose.createConnection(mongoURI);

// Create GridFS model
let gfs;
connection.once('open', () => {
  gfs = new GridFSBucket(connection.db, {
    bucketName: 'uploads',
  });
});

// Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });


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
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { userId, content, title, tags, username } = req.body;

    if (!userId || !content || !title || !username) {
      return res.status(400).json({ error: 'userId, content, and title are required' });
    }

    const files = req.files || [];

    // Use GridFSBucket to handle file uploads
    const bucket = new mongoose.mongo.GridFSBucket(connection.db, {
      bucketName: 'uploads',
    });

    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(file.originalname);
        uploadStream.end(file.buffer);

        uploadStream.on('finish', () => {
          resolve(uploadStream.id.toString());
        });

        uploadStream.on('error', (err) => {
          reject(err);
        });
      });
    });

    const images = await Promise.all(filePromises);

    // Create a new post
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

const getImage = async (req, res) => {
  try {
    const { filename } = req.params;

    // Convert the filename to ObjectId and query GridFS
    const objectId = new mongoose.Types.ObjectId(filename);

    // Check if the file exists
    gfs.find({ _id: objectId }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }

      // Stream the image to the response
      gfs.openDownloadStream(objectId).pipe(res);
    });
  } catch (err) {
    console.error('Error retrieving image:', err);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
};


const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, title, tags } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const images = req.files ? req.files.map(file => file.filename) : post.images;

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
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Post not found' });
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
      replies: [],
      createdAt: new Date(),
    });

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ error: 'Parent comment not found' });
      }

      await newComment.save();
      parentComment.replies.unshift(newComment._id);
      await parentComment.save();
    } else {
      await newComment.save();
    }

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const currentUserId = req.user?.id;

    const comments = await Comment.find({ postId, parentCommentId: null })
      .populate('userId', 'username')
      .populate({
        path: 'replies',
        options: { sort: { createdAt: -1 } },
        populate: { path: 'userId', select: 'username' },
      })
      .sort({ createdAt: -1 });

    const commentsWithEditFlag = comments.map(comment => ({
      ...comment.toObject(),
      isEditable: comment.userId.toString() === currentUserId,
      replies: comment.replies.map(reply => ({
        ...reply.toObject(),
        isEditable: reply.userId.toString() === currentUserId,
      })),
    }));

    res.json(commentsWithEditFlag);
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

    if (result.deletedCount === 0) return res.status(404).json({ error: 'Comment not found' });

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
    const { userId } = req.query;

    const likes = await Like.find({ postId });
    const hasLiked = userId ? likes.some(like => like.userId.toString() === userId) : false;

    res.status(200).json({
      totalLikes: likes.length,
      hasLiked,
    });
  } catch (err) {
    next(err);
  }
};

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

module.exports = {
  upload,
  getImage,
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