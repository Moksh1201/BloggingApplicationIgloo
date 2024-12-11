import React, { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi"; 
import { BsBookmarkFill } from "react-icons/bs"; 
import { Blog } from "../../../../Context/Context";
import axiosInstance from '../../../../axiosInstance'; 
import { toast } from "react-toastify";

const SavePost = ({ postId }) => {
  const [isSaved, setIsSaved] = useState(false); 
  const { currentUser, setAuthModel } = Blog();
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error("No token found");
        setUserId(null); 
        return;
      }

      try {
        const response = await axiosInstance.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched user info:", response.data);
        setUserId(response.data.id); 
      } catch (error) {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        setUserId(null); 
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (!userId) return;

    const fetchSaves = async () => {
      try {
        console.log(`Fetching saves for postId: ${postId}`);
        const response = await axiosInstance.get(`/favorites/${postId}/favorites`);
        const saves = response.data;

        // Check if the current user has already saved the post
        const saved = saves.some((saved) => saved.userId === userId);
        setIsSaved(saved);
        console.log(`User ${userId} has saved this post: ${saved}`);
      } catch (error) {
        console.error("Error fetching saves:", error.response ? error.response.data : error.message);
      }
    };

    fetchSaves();
  }, [postId, userId]);

  const handleSave = async () => {
    if (!userId) {
      console.log("User is not authenticated, showing login modal.");
      setAuthModel(true);
      return;
    }

    try {
      const url = `/favorites/${postId}/favorites`;
      console.log(`Sending request to URL: ${url}`);
      console.log(`Current User ID: ${userId}`);

      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (isSaved) {
        console.log(`unSaving the post with postId: ${postId} by userId: ${userId}`);
        await axiosInstance.delete(url, {
          ...requestConfig,
          data: { userId },
        });
      } else {
        console.log(`Saving the post with postId: ${postId} by userId: ${userId}`);
        await axiosInstance.post(url, {
          userId,
        }, requestConfig);
      }

      setIsSaved(!isSaved);
      console.log(`Updated saved status: ${!isSaved}`);
    } catch (error) {
      console.error("Error updating saved status:", error.response ? error.response.data : error.message);
      toast.error("Error updating saved status");
    }
  };

  return (
<button onClick={handleSave} className="flex items-center gap-1 text-sm">
      <FiBookmark
        className={`text-xl ${isSaved ? "text-black" : "text-gray-500"}`}
      />
    </button>
  );
};

export default SavePost;
