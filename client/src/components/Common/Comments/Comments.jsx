import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from "../../../Context/Context";
import Loading from "../../Loading/Loading";
import Comment from "./Comment";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser, showComment, setShowComment, setCommentLength } = Blog();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedComments = response.data.map((comment) => ({
          ...comment,
          timestamp: moment.utc(comment.createdAt).local().fromNow(),
        }));
        setComments(formattedComments);
        setCommentLength(formattedComments.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, setCommentLength, token]);

  // Submit a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/posts/${postId}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newCommentWithFormattedTime = {
        ...response.data,
        timestamp: moment(response.data.createdAt).fromNow(),
      };
      setComments((prev) => [newCommentWithFormattedTime, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle comment deletion
  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };
  const updateComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
  };
  
  
  const updateReply = (updatedReply) => {
    setReplies((prevReplies) =>
      prevReplies.map((reply) =>
        reply._id === updatedReply._id ? updatedReply : reply
      )
    );
  };
  

  return (
    <div>
      {showComment && (
        <Modal setModal={setShowComment} modal={showComment}>
          <section className="fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadow-lg p-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Responses ({comments.length})</h3>
              <button onClick={() => setShowComment(false)} className="text-2xl hover:opacity-70">
                <LiaTimesSolid />
              </button>
            </div>

            {currentUser && (
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                />
                <div className="flex flex-wrap mt-2">
                  {["😊", "😂", "😍", "😎", "😭", "😢", "😡", "🥺", "😜"].map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setNewComment((prev) => prev + emoji)}
                      className="text-2xl mr-2 mb-2"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <button type="submit" className="btn !bg-blue-500 !text-white mt-2 w-full py-2 rounded-lg">
                  Comment
                </button>
              </form>
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
                    updateReply ={updateReply}
                  />
                ))}
              </div>
            )}
          </section>
        </Modal>
      )}
    </div>
  );
};

export default Comments;
