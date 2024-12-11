// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//   postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   username: { type: String, required: true },
//   content: { type: String, required: true },
//   parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
//   createdAt: { type: Date, default: Date.now },
//   
// });

// const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

// module.exports = Comment;
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },  
  userId: { type: String, required: true }, 
  username: { type: String, required: true },
  content: { type: String, required: true },
  parentCommentId: { type: String, default: null },  
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const Comment = mongoose.model('Comment', commentSchema);


module.exports = mongoose.model('Comment', commentSchema);
