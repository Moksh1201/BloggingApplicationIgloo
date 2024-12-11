import React, { useEffect, useState } from "react";
import { Blog } from "../../../../Context/Context";
import axiosInstance from "../../../../axiosInstance"; 
import PostsCard from "../../../Common/Posts/PostsCard";

const ProfileHome = ({ userId, username }) => {
  const { currentUser, postLoading } = Blog();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);

        if (!userId && !username) {
          console.error('User ID or username not provided');
          return;
        }

        const response = await axiosInstance.get(`/posts/user/${userId}`);

        setUserPosts(response.data);

      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [username, userId]);

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
