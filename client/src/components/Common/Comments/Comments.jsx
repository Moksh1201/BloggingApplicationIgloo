// Comments.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from "../../../Context/Context";
import Loading from "../../Loading/Loading";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const { currentUser, showComment, setShowComment, setCommentLength, allUsers, setCurrentUser } = Blog();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');

  const predefinedEmojis = ['❤️', '👏🏻', '😂', '🔥', '🙌🏻','😢', '👍']; 
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!currentUser) {
        try {
          const response = await axiosInstance.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, [token, currentUser, setCurrentUser]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data);
        setCommentLength(response.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, setCommentLength, token]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setNewComment((prev) => prev + emoji);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUser) {
      console.error("User must be signed in to add a comment");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/posts/${postId}/comments`,
        {
          userId: currentUser.id,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error.response ? error.response.data : error.message);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!commentId) {
      console.error("Comment ID is missing.");
      return;
    }

    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.response ? error.response.data : error.message);
    }
  };

  const updateComment = async (commentId, updatedContent) => {
    try {
      const response = await axiosInstance.put(
        `/posts/${postId}/comments/${commentId}`,
        { content: updatedContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, content: response.data.content } : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal setModal={setShowComment} modal={showComment}>
      <section className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5 overflow-y-auto transition-all duration-500 ${showComment ? "translate-x-0" : "translate-x-[23rem]"}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Responses ({comments.length})</h3>
          <button
            onClick={() => setShowComment(false)}
            className="text-2xl hover:opacity-70"
          >
            <LiaTimesSolid />
          </button>
        </div>


        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              rows={3}
            />
            <div className="flex gap-2 mt-2">
              {predefinedEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-2xl"
                >
                  {emoji}
                </button>
              ))}
              <button type="submit" className="btn !bg-blue-500 !text-white">
                Comment
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-4">You must be signed in to add a comment</p>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="mt-4">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                item={comment}
                postId={postId}
                handleCommentDelete={handleCommentDelete}
                updateComment={updateComment}
              />
            ))}
          </div>
        )}
      </section>
    </Modal>
  );
};

export default Comments;
