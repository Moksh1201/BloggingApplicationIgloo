
import React, { useEffect, useState } from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { Blog } from "../../../../Context/Context";
import axiosInstance from "../../../../axiosInstance";
import { toast } from "react-toastify";

const Like = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); 
  const { currentUser, setAuthModel } = Blog();
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("authToken");

  // Fetch user information
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUserId(null);
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user info:", error.message);
        setUserId(null);
      }
    };

    fetchUser();
  }, [token]);

  // Fetch like status and total likes
  useEffect(() => {
    if (!postId || !userId) return;

    const fetchLikeData = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}/likes`, {
          params: { userId },
        });

        setIsLiked(response.data.hasLiked);
        setLikeCount(response.data.totalLikes);
      } catch (error) {
        console.error("Error fetching like data:", error.message);
      }
    };

    fetchLikeData();
  }, [postId, userId]);

  const handleLike = async () => {
    if (!userId) {
      setAuthModel(true);
      return;
    }

    try {
      const url = `/posts/${postId}/likes`;
      const requestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (isLiked) {
        await axiosInstance.delete(url, {
          ...requestConfig,
          data: { userId },
        });
        setLikeCount((prev) => Math.max(prev - 1, 0)); 
      } else {
        await axiosInstance.post(url, { userId }, requestConfig);
        setLikeCount((prev) => prev + 1); 
      }

      setIsLiked(!isLiked); 
    } catch (error) {
      console.error("Error updating like status:", error.message);
      toast.error("Error updating like status");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLike} className="flex items-center gap-1 text-sm">
        <PiHandsClappingDuotone
          className={`text-xl ${isLiked ? "text-black" : "text-gray-500"}`}
        />
      </button>
      <span>{likeCount}</span> 
    </div>
  );
};

export default Like;
