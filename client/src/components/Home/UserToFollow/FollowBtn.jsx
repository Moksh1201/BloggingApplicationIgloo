import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";

const FollowBtn = ({ userId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch current user ID
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setCurrentUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching current user:", error);
        toast.error("Unable to fetch user details. Please try again.");
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUserId || !userId || loading) return; 
  
    const fetchFollowStatus = async () => {
      try {
        const response = await axiosInstance.get(`/profile/${currentUserId}/follows/${userId}`);
        setIsFollowed(response.data.isFollowed);
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };
  
    fetchFollowStatus();
  }, [currentUserId, userId, loading]); 
  
  
  
  const handleFollow = async () => {
    if (!currentUserId) {
      toast.error("Please log in to follow or unfollow a user.");
      return;
    }
  
    setLoading(true);
    try {
      const endpoint = isFollowed
        ? `/profile/${userId}/unfollow` // Unfollow endpoint
        : `/profile/${userId}/follow`; // Follow endpoint
  
      const response = await axiosInstance.post(endpoint);
  
      if (response.status === 200 && response.data.success) {
        // Optimistically update the state
        setIsFollowed((prev) => !prev);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Action failed.");
      }
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  // Render follow button
  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-4 py-2 rounded-full transition-all duration-200 ${
        isFollowed ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
      }`}
    >
      {loading ? "Loading..." : isFollowed ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtn;
