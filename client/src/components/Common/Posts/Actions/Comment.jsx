//comments count to be added
import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { Blog } from "../../../../Context/Context";
import axios from 'axios';

const Comment = () => {
  const { setShowComment, setCommentLength, postId } = Blog();  

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`); 
        const count = response.data.length;
        setCommentLength(count);  
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
