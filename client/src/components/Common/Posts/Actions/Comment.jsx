//comments count to be added
import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { Blog } from "../../../../Context/Context";
import axios from 'axios';

const Comment = () => {
  const { setShowComment, setCommentLength, postId } = Blog();  // Added postId from context

  useEffect(() => {
    // Fetch comments count from the API
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`); // Update with your API endpoint
        const count = response.data.length;
        setCommentLength(count);  // Update comment length in context
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };

    fetchCommentCount();
  }, [postId, setCommentLength]);

  return (
    <button
      onClick={() => setShowComment(true)}
      className="flex items-center gap-1 text-sm">
      <FaRegComment className="text-lg" />
    </button>
  );
};

export default Comment;
