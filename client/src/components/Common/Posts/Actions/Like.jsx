// import React, { useEffect, useState } from "react";
// import { PiHandsClappingDuotone } from "react-icons/pi";
// import { Blog } from "../../../../Context/Context";
// import axiosInstance from '../../../../axiosInstance'; // Import the correct axios instance
// import { toast } from "react-toastify";

// const Like = ({ postId }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const { currentUser, setAuthModel } = Blog();
//   const [userId, setUserId] = useState(null);

//   // Retrieve the token from local storage
//   const token = localStorage.getItem('authToken');

//   // Fetch user information using token
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token) {
//         console.error("No token found");
//         setUserId(null); // Ensure userId is reset
//         return;
//       }

//       try {
//         const response = await axiosInstance.get('/auth/me', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         console.log("Fetched user info:", response.data);
//         setUserId(response.data.id); // Set user ID from response
//       } catch (error) {
//         console.error("Error fetching user info:", error.response ? error.response.data : error.message);
//         setUserId(null); // Reset userId on error
//       }
//     };

//     fetchUser();
//   }, [token]);

//   // Check if the current user has liked the post
//   useEffect(() => {
//     if (!userId) return;

//     const fetchLikes = async () => {
//       try {
//         console.log(`Fetching likes for postId: ${postId}`);
//         const response = await axiosInstance.get(`/posts/${postId}/likes`);
//         const likes = response.data;

//         // Check if the current user has already liked the post
//         const liked = likes.some((like) => like.userId === userId);
//         setIsLiked(liked);
//         console.log(`User ${userId} has liked this post: ${liked}`);
//       } catch (error) {
//         console.error("Error fetching likes:", error.response ? error.response.data : error.message);
//       }
//     };

//     fetchLikes();
//   }, [postId, userId]);

//   const handleLike = async () => {
//     if (!userId) {
//       console.log("User is not authenticated, showing login modal.");
//       setAuthModel(true);
//       return;
//     }

//     try {
//       const url = `/posts/${postId}/likes`;
//       console.log(`Sending request to URL: ${url}`);
//       console.log(`Current User ID: ${userId}`);

//       const requestConfig = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };

//       if (isLiked) {
//         console.log(`Unliking the post with postId: ${postId} by userId: ${userId}`);
//         await axiosInstance.delete(url, {
//           ...requestConfig,
//           data: { userId },
//         });
//       } else {
//         console.log(`Liking the post with postId: ${postId} by userId: ${userId}`);
//         await axiosInstance.post(url, {
//           userId,
//         }, requestConfig);
//       }

//       // Toggle the like status
//       setIsLiked(!isLiked);
//       console.log(`Updated like status: ${!isLiked}`);
//     } catch (error) {
//       console.error("Error updating like status:", error.response ? error.response.data : error.message);
//       toast.error("Error updating like status");
//     }
//   };

//   return (
//     <button onClick={handleLike} className="flex items-center gap-1 text-sm">
//       <PiHandsClappingDuotone
//         className={`text-xl ${isLiked ? "text-black" : "text-gray-500"}`}
//       />
//     </button>
//   );
// };

// export default Like;
import React, { useEffect, useState } from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { Blog } from "../../../../Context/Context";
import axiosInstance from "../../../../axiosInstance";
import { toast } from "react-toastify";

const Like = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track total likes
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
        setLikeCount((prev) => Math.max(prev - 1, 0)); // Decrement like count
      } else {
        await axiosInstance.post(url, { userId }, requestConfig);
        setLikeCount((prev) => prev + 1); // Increment like count
      }

      setIsLiked(!isLiked); // Toggle the like status
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
      <span>{likeCount}</span> {/* Display like count */}
    </div>
  );
};

export default Like;
