import React, { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "../../../../Context/Context";
import PostsCard from "../../../Common/Posts/PostsCard";
const ProfileHome = () => {
  const { currentUser, postData, postLoading } = Blog();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);

        if (!currentUser || !currentUser.id || !currentUser.token) {
          console.error('Current user not found or incomplete data');
          return;
        }

        const token = currentUser.token;

        const response = await axios.get("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredPosts = response.data.filter(post => post.userId === currentUser.id);
        setUserPosts(filteredPosts);

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
