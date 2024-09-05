import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { Blog } from "../../../../Context/Context";
import axios from 'axios';
import { toast } from "react-toastify";

const SavedPost = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const { currentUser, setAuthModel } = Blog();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(`/api/users/${currentUser.uid}/savedPosts`);
          const posts = response.data;
          setSavedPosts(posts);
          setIsSaved(posts.some((item) => item._id === post?._id)); // Match using `_id`
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts(); // Fetch saved posts on component mount or when currentUser changes
  }, [currentUser, post?._id]); // Dependency array includes `currentUser` and `post?._id`

  const handleSave = async () => {
    if (!currentUser) {
      setAuthModel(true);
      return;
    }

    try {
      if (isSaved) {
        // Unsaving the post
        await axios.delete(`/api/users/${currentUser.uid}/savedPosts/${post._id}`);
        toast.success("Post has been unsaved");
      } else {
        // Saving the post
        await axios.post(`/api/users/${currentUser.uid}/savedPosts`, {
          postId: post._id, // Match using `_id`
          ...post,
        });
        toast.success("Post has been saved");
      }

      // Refresh saved posts
      const response = await axios.get(`/api/users/${currentUser.uid}/savedPosts`);
      setSavedPosts(response.data);
      setIsSaved(!isSaved); // Toggle the saved state
    } catch (error) {
      console.error("Error updating saved posts:", error);
      toast.error("An error occurred while saving the post.");
    }
  };

  return (
    <div>
      <button onClick={handleSave} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-event-none ${isSaved ? "text-yellow-600" : ""}`}
        />
      </button>
    </div>
  );
};

export default SavedPost;
