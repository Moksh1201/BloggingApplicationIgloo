// import React, { useEffect, useState } from "react";
// import axios from "../../../axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { Blog } from "../../../Context/Context"; // Import Blog context

// const AdminPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { currentUser } = Blog(); // Get currentUser from the context

//   useEffect(() => {
//     if (!currentUser?.isAdmin) {
//       navigate("/"); // Redirect to home if the user is not an admin
//       return;
//     }

//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("/posts");
//         console.log("Fetched Posts:", response.data);
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setError("Failed to fetch posts. Try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [currentUser, navigate]);

//   const handleDeletePost = async (postId) => {
//     const confirmed = window.confirm("Do you really want to delete this post?");
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/posts/${postId}`);
//       setPosts(posts.filter(post => post._id !== postId)); // Remove post from state
//       console.log("Post deleted:", postId);
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const processImageData = (imageData) => {
//     // Check if the image data is base64 or URL
//     if (imageData && imageData.startsWith("data:image/")) {
//       return imageData; // Base64 image data, return it as is
//     }
//     if (imageData && !imageData.startsWith("http")) {
//       // If image is stored as a relative path or doesn't start with http
//       return `data:image/png;base64,${imageData}`;
//     }
//     return imageData; // If it's a proper URL, return it as is
//   };

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (posts.length === 0) return <p>No posts available.</p>;

//   return (
//     <div className="admin-posts-container" style={{ padding: "2rem", backgroundColor: "#f4f4f4", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
//       <h2 style={{ marginBottom: "1rem", fontSize: "24px", fontWeight: "600" }}>Admin Panel - Posts</h2>
//       <div className="posts-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
//         {posts.map((post) => (
//           <div key={post._id} className="post-card" style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
//             <div className="post-header" style={{ marginBottom: "15px" }}>
//               <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{post.title}</h3>
//               <p style={{ fontSize: "14px", color: "#555" }}>By {post.username} on {post.created}</p>
//             </div>
//             <div className="post-image" style={{ height: "180px", overflow: "hidden", borderRadius: "8px", marginBottom: "15px" }}>
//               <img
//                 src={processImageData(post.image)} // Process image data here
//                 alt={post.title}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 onError={(e) => {
//                   e.target.src = "default-image.jpg"; // Fallback image on error
//                   console.log("Error loading image:", e);
//                 }}
//               />
//             </div>
//             <p style={{ color: "#333", fontSize: "14px", marginBottom: "15px" }}>{post.desc}</p>
//             <div className="post-actions" style={{ display: "flex", justifyContent: "space-between" }}>
//               <button
//                 onClick={() => handleDeletePost(post._id)}
//                 style={{
//                   backgroundColor: "#FF4B5C",
//                   color: "white",
//                   border: "none",
//                   padding: "8px 15px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                 }}
//               >
//                 Delete Post
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPosts;
// import React, { useEffect, useState } from "react";
// import axios from "../../../axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { Blog } from "../../../Context/Context"; // Import Blog context

// const AdminPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { currentUser } = Blog(); // Get currentUser from the context

//   useEffect(() => {
//     if (!currentUser?.isAdmin) {
//       navigate("/"); // Redirect to home if the user is not an admin
//       return;
//     }

//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("/posts");
//         console.log("Fetched Posts:", response.data);
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setError("Failed to fetch posts. Try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [currentUser, navigate]);

//   const handleDeletePost = async (postId) => {
//     const confirmed = window.confirm("Do you really want to delete this post?");
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/posts/${postId}`);
//       setPosts(posts.filter(post => post._id !== postId)); // Remove post from state
//       console.log("Post deleted:", postId);
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const getImageUrl = (imagePath) => {
//     if (imagePath && Array.isArray(imagePath) && imagePath.length > 0) {
//       console.log("Image path:", imagePath[0]);  // Debug the image path
//       return `http://localhost:5001${imagePath[0]}`;
//     }
//     console.log("No image found, using fallback");  // Debug for no image
//     return '/default-image.png'; // Fallback image
//   };

//   const handleImageClick = (postId) => {
//     navigate(`/posts/${postId}`); // Navigate to post detail page
//   };

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (posts.length === 0) return <p>No posts available.</p>;

//   return (
//     <div className="admin-posts-container" style={{ padding: "2rem", backgroundColor: "#f4f4f4", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
//       <h2 style={{ marginBottom: "1rem", fontSize: "24px", fontWeight: "600" }}>Admin Panel - Posts</h2>
//       <div className="posts-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
//         {posts.map((post) => (
//           <div key={post._id} className="post-card" style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
//             <div className="post-header" style={{ marginBottom: "15px" }}>
//               <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{post.title}</h3>
//               <p style={{ fontSize: "14px", color: "#555" }}>By {post.username} on {post.created}</p>
//             </div>
//             <div className="post-image" style={{ height: "180px", overflow: "hidden", borderRadius: "8px", marginBottom: "15px" }}>
//               <img
//                 src={getImageUrl(post.image)} // Use getImageUrl to handle image fetching
//                 alt={post.title}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 onError={(e) => {
//                   e.target.src = "/default-image.png"; // Fallback image on error
//                   console.log("Error loading image:", e);
//                 }}
//                 onClick={() => handleImageClick(post._id)} // Navigate to post details
//               />
//             </div>
//             <p style={{ color: "#333", fontSize: "14px", marginBottom: "15px" }}>{post.desc}</p>
//             <div className="post-actions" style={{ display: "flex", justifyContent: "space-between" }}>
//               <button
//                 onClick={() => handleDeletePost(post._id)}
//                 style={{
//                   backgroundColor: "#FF4B5C",
//                   color: "white",
//                   border: "none",
//                   padding: "8px 15px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                 }}
//               >
//                 Delete Post
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPosts;
import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../Context/Context"; // Import Blog context

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = Blog(); // Get currentUser from the context

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate("/"); // Redirect to home if the user is not an admin
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
      setPosts(posts.filter(post => post._id !== postId)); // Remove post from state
      console.log("Post deleted:", postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath && Array.isArray(imagePath) && imagePath.length > 0) {
      console.log("Image path:", imagePath[0]);  // Debug the image path
      return `http://localhost:5001${imagePath[0]}`;
    }
    console.log("No image found, using fallback");  // Debug for no image
    return '/default-image.png'; // Fallback image
  };

  const handleImageClick = (postId) => {
    navigate(`/posts/${postId}`); // Navigate to post detail page
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (posts.length === 0) return <p>No posts available.</p>;

  return (
    <div className="admin-posts-container" style={{ padding: "2rem", backgroundColor: "#f4f4f4", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "24px", fontWeight: "600" }}>Admin Panel - Posts</h2>
      <div className="posts-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {posts.map((post) => (
          <div key={post._id} className="post-card" style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <div className="post-header" style={{ marginBottom: "15px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{post.title}</h3>
              <p style={{ fontSize: "14px", color: "#555" }}>By {post.username} on {post.created}</p>
            </div>
            <div className="post-image" style={{ height: "180px", overflow: "hidden", borderRadius: "8px", marginBottom: "15px" }}>
              <img
                src={getImageUrl(post.image)} // Use getImageUrl to handle image fetching
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  if (e.target.src !== "/default-image.png") {  // Prevent infinite loop
                    e.target.src = "/default-image.png"; // Fallback image on error
                    console.log("Error loading image:", e);
                  }
                }}
                onClick={() => handleImageClick(post._id)} // Navigate to post details
              />
            </div>
            <p style={{ color: "#333", fontSize: "14px", marginBottom: "15px" }}>{post.desc}</p>
            <div className="post-actions" style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => handleDeletePost(post._id)}
                style={{
                  backgroundColor: "#FF4B5C",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
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

export default AdminPosts;
