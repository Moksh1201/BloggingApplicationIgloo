import React, { useEffect, useState } from "react";
import { Blog } from "../../../../Context/Context";
import axiosInstance from "../../../../axiosInstance"; // Import your axiosInstance
import PostsCard from "../../../Common/Posts/PostsCard";

const ProfileHome = () => {
  const { currentUser, postData, postLoading } = Blog();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);

        if (!currentUser || !currentUser.username) {
          console.error('Current user not found or incomplete data');
          return;
        }

        const username = currentUser.username;  // Use username from currentUser

        // Fetch posts for the current user from the API endpoint
        const response = await axiosInstance.get(`/posts/user/${username}`);

        // Assuming the posts are returned in the response, no need to filter here
        setUserPosts(response.data);

      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [currentUser]);

  if (loading || postLoading) {
    return <p>Loading posts...</p>;
  }

  if (userPosts.length === 0) {
    return <p>No posts available for this user.</p>;
  }

  return (
    <div className="profile-home">
      <h2 className="heading">User Posts</h2>
      {userPosts.map(post => (
        <PostsCard key={post._id} post={post} /> 
      ))}
    </div>
  );
};

export default ProfileHome;
