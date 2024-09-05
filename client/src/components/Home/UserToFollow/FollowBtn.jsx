import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSingleFetch from "../../hooks/useSingleFetch";
import { useLocation } from "react-router-dom";

const FollowBtn = ({ userId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentUser } = useSingleFetch("current-user"); // Fetch current user data
  const { data: follows } = useSingleFetch("users", currentUser?.userId, "follows");
  const { pathname } = useLocation();

  useEffect(() => {
    setIsFollowed(follows && follows.findIndex((item) => item.userId === userId) !== -1);
  }, [follows, userId]);

  const handleFollow = async () => {
    try {
      if (currentUser) {
        const endpoint = isFollowed
          ? `/api/users/${currentUser.userId}/follows/${userId}`
          : `/api/users/${currentUser.userId}/follows`;
        const followerEndpoint = isFollowed
          ? `/api/users/${userId}/followers/${currentUser.userId}`
          : `/api/users/${userId}/followers`;

        const method = isFollowed ? 'DELETE' : 'POST';
        
        // Follow or unfollow user
        await fetch(endpoint, { method });
        await fetch(followerEndpoint, { method });

        setIsFollowed(!isFollowed);
        toast.success(isFollowed ? "User is unfollowed" : "User is followed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`${
        pathname === "/" ? "border border-black" : ""
      } px-3 py-[0.2rem] rounded-full
      ${isFollowed ? "text-gray-500 border-none" : ""}`}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtn;
