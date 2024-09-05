import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance"; 
import PostsCard from "./PostsCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        console.log("Fetched posts with images:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p style={{ textAlign: "center", fontSize: "1.2rem" }}>No posts available.</p>;
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <h2 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        textAlign: "flex",
        marginBottom: "1.5rem",
        borderBottom: "2px solid #ddd",
        paddingBottom: "0.5rem"
      }}>Latest Posts </h2>
    
      {posts.map((post) => (
        <PostsCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
