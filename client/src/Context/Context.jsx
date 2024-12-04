import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import useFetch from "../components/hooks/useFetch";

const BlogContext = createContext();

const Context = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [allUsers, setAllUsers] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState(0);
  const [authModel, setAuthModel] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publish, setPublish] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]); // New state for filtered posts

  // Fetch the current user based on the token
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No token found. Logging out.");
      setCurrentUser(null);
      setLoading(false); 
      return;
    }

    try {
      const response = await axios.get("http://localhost:5001/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched User Data:", response.data);
      setCurrentUser({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        token,
        isAdmin: response.data.isAdmin,
        followers: response.data.followers,
        following: response.data.following,
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
      setCurrentUser(null);
      localStorage.removeItem("authToken"); // Clear invalid token
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/profile");
      console.log("All Users Response:", response.data);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch post data using the custom hook
  const { data: postData, loading: postLoading } = useFetch("posts");

  // Function to filter posts based on criteria (e.g., title)
  const filterPosts = (criteria) => {
    const filtered = postData.filter((post) =>
      post.title.toLowerCase().includes(criteria.toLowerCase()) // Example filter by title
    );
    setFilteredPosts(filtered); // Update the filtered posts state
  };

  // Run fetchCurrentUser on initial load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Fetch all users whenever needed
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading || postLoading) {
    return <Loading />;
  }

  return (
    <BlogContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        publish,
        setPublish,
        showComment,
        setShowComment,
        commentLength,
        setCommentLength,
        updateData,
        setUpdateData,
        title,
        setTitle,
        description,
        setDescription,
        postData,
        postLoading,
        filteredPosts, // Pass filtered posts to context
        filterPosts,   // Pass filter function to context
        authModel,
        setAuthModel,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default Context;

// Custom hook to consume BlogContext
export const Blog = () => useContext(BlogContext);
