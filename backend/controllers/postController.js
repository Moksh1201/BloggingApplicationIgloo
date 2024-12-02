const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const multer = require('multer');
const postsFilePath = path.join(__dirname, '../data/posts.json');
const commentsFilePath = path.join(__dirname, '../data/comments.json');
const likesFilePath = path.join(__dirname, '../data/likes.json');
const usersFilePath = './data/users.json';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Controller functions
const getPosts = async (req, res, next) => {
  try {
    const posts = await readJSONFile(postsFilePath);
    res.json(posts);
  } catch (err) {
    next(err);
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
    const { userId, content, title, tags } = req.body;

    if (!userId || !content || !title) {
      return res.status(400).json({ error: 'userId, content, and title are required' });
    }

    console.log('Received files:', req.files);

    const posts = await readJSONFile(postsFilePath);

    const images = req.files && req.files.length > 0
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    console.log('Image paths:', images); 

    const newPost = {
      _id: uuidv4(),
      userId,
      content,
      title,
      tags: tags || '',
      images, 
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    posts.push(newPost);

    await writeJSONFile(postsFilePath, posts);

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    next(err);
  }
};



const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, title, tags } = req.body;

    const posts = await readJSONFile(postsFilePath);
    const postIndex = posts.findIndex(p => p._id === postId);

    if (postIndex === -1) return res.status(404).json({ error: "Post not found" });

    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : posts[postIndex].images;

    posts[postIndex] = {
      ...posts[postIndex],
      content,
      title: title || posts[postIndex].title,
      tags: tags || posts[postIndex].tags,
      images,
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
    const { content, parentCommentId } = req.body;
    const userId = req.user?.id;

    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }

    const users = await readJSONFile(usersFilePath);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const comments = await readJSONFile(commentsFilePath);

    const newComment = {
      _id: uuidv4(),
      postId,
      userId,
      username: user.username, 
      content,
      parentCommentId: parentCommentId || null,
      createdAt: new Date(),
      replies: [], 
    };

    if (parentCommentId) {
      const parentComment = comments.find((c) => c._id === parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ error: 'Parent comment not found' });
      }
      const newReply = { ...newComment, _id: uuidv4() };
      parentComment.replies.unshift(newReply);
    } else {
      comments.unshift(newComment);
    }

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

    const postComments = comments.filter(c => c.postId === postId && !c.parentCommentId);
    res.json(postComments);
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
};


const removeComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    let comments = await readJSONFile(commentsFilePath);
    const commentIndex = comments.findIndex(c => c._id === commentId && c.postId === postId);

    if (commentIndex === -1) return res.status(404).json({ error: "Comment not found" });

    const [removedComment] = comments.splice(commentIndex, 1);

    const deleteNestedReplies = (parentId) => {
      comments = comments.filter(c => {
        if (c.parentCommentId === parentId) {
          deleteNestedReplies(c._id);
          return false;
        }
        return true;
      });
    };

    deleteNestedReplies(removedComment._id);

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
  updateComment,
  removeComment,
  likePost,
  unlikePost,
  getLikesForPost,
};
