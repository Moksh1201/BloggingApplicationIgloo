import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../Context/Context";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = Blog();

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate("/");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        console.log("Fetched Posts:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser, navigate]);

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm("Do you really want to delete this post?");
    if (!confirmed) return;

    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
      console.log("Post deleted:", postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const getImageUrl = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      const imagePath = images[0].startsWith("/")
        ? images[0]
        : `/${images[0]}`;
      return `http://localhost:5001${imagePath}`;
    }
    return "/default-image.png";
  };

  const handleImageClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (posts.length === 0) return <p>No posts available.</p>;

  return (
    <div className="admin-posts-container" style={styles.container}>
      <h2 style={styles.header}>Admin Panel - Posts</h2>
      <div className="posts-list" style={styles.grid}>
        {posts.map((post) => (
          <div key={post._id} className="post-card" style={styles.card}>
            <div className="post-image" style={styles.imageContainer}>
              <img
                src={getImageUrl(post.images)}
                alt={post.title}
                style={styles.image}
                onError={(e) => {
                  if (!e.target.src.endsWith("/default-image.png")) {
                    e.target.src = "/default-image.png";
                  }
                }}
                onClick={() => handleImageClick(post._id)}
              />
            </div>
            <div className="post-content" style={styles.content}>
              <h3 style={styles.title}>{post.title}</h3>
              <p style={styles.metadata}>
                By {post.username} on {post.created}
              </p>
              <p style={styles.description}>{post.desc}</p>
              <button
                onClick={() => handleDeletePost(post._id)}
                style={styles.deleteButton}
              >
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  header: {
    marginBottom: "1rem",
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
  },
  content: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  metadata: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "15px",
  },
  deleteButton: {
    backgroundColor: "#FF4B5C",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    alignSelf: "flex-start",
  },
};

export default AdminPosts;
