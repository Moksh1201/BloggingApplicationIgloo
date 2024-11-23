// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import useSingleFetch from "../../hooks/useSingleFetch";
// import { useLocation } from "react-router-dom";

// const FollowBtn = ({ userId }) => {
//   const [isFollowed, setIsFollowed] = useState(false);
//   const { currentUser } = useSingleFetch("current-user"); 
//   const { data: follows } = useSingleFetch("users", currentUser?.userId, "follows");
//   const { pathname } = useLocation();

//   useEffect(() => {
//     setIsFollowed(follows && follows.findIndex((item) => item.userId === userId) !== -1);
//   }, [follows, userId]);

//   const handleFollow = async () => {
//     try {
//       if (currentUser) {
//         const endpoint = isFollowed
//           ? `/api/users/${currentUser.userId}/follows/${userId}`
//           : `/api/users/${currentUser.userId}/follows`;
//         const followerEndpoint = isFollowed
//           ? `/api/users/${userId}/followers/${currentUser.userId}`
//           : `/api/users/${userId}/followers`;

//         const method = isFollowed ? 'DELETE' : 'POST';
        
//         // Follow or unfollow user
//         await fetch(endpoint, { method });
//         await fetch(followerEndpoint, { method });

//         setIsFollowed(!isFollowed);
//         toast.success(isFollowed ? "User is unfollowed" : "User is followed");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <button
//       onClick={handleFollow}
//       className={`${
//         pathname === "/" ? "border border-black" : ""
//       } px-3 py-[0.2rem] rounded-full
//       ${isFollowed ? "text-gray-500 border-none" : ""}`}
//     >
//       {isFollowed ? "Following" : "Follow"}
//     </button>
//   );
// };

// export default FollowBtn;
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

  // Check follow status
  useEffect(() => {
    if (!currentUserId || !userId || loading) return; // Skip fetch if action is ongoing
  
    const fetchFollowStatus = async () => {
      try {
        const response = await axiosInstance.get(`/profile/${currentUserId}/follows/${userId}`);
        setIsFollowed(response.data.isFollowed);
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };
  
    fetchFollowStatus();
  }, [currentUserId, userId, loading]); // Trigger only when relevant dependencies change
  
  
  

  // Handle follow/unfollow action
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
