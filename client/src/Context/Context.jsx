// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import Loading from "../components/Loading/Loading";
// import useFetch from "../components/hooks/useFetch";

// const BlogContext = createContext();

// const Context = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userLoading, setUserLoading] = useState(true);
//   const [allUsers, setAllUsers] = useState([]);
//   const [showComment, setShowComment] = useState(false);
//   const [commentLength, setCommentLength] = useState(0);
//   const [authModel, setAuthModel] = useState(false);
//   const [updateData, setUpdateData] = useState({});
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [publish, setPublish] = useState(false);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await axios.get("/auth/me");
//         console.log("Fetched User Data:", response.data);
//         setCurrentUser({
//           id: response.data.id,
//           username: response.data.username,
//           email: response.data.email,
//           token: localStorage.getItem('authToken'), 
//         });
//       } catch (error) {
//         console.error("Error fetching current user:", error);
//         setCurrentUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/profile");
//         console.log("All Users Response:", response.data); 
//         setAllUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setUserLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const { data: postData, loading: postLoading } = useFetch("posts");

//   if (loading || postLoading) {
//     return <Loading />;
//   }

//   return (
//     <BlogContext.Provider
//       value={{
//         currentUser,
//         setCurrentUser,
//         allUsers,
//         userLoading,
//         publish,
//         setPublish,
//         showComment,
//         setShowComment,
//         commentLength,
//         setCommentLength,
//         updateData,
//         setUpdateData,
//         title,
//         setTitle,
//         description,
//         setDescription,
//         postData,
//         postLoading,
//         authModel,
//         setAuthModel,
//       }}
//     >
//       {children}
//     </BlogContext.Provider>
//   );
// };

// export default Context;

// export const Blog = () => useContext(BlogContext);
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

  // Fetch the current user based on the token
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No token found. Logging out.");
      setCurrentUser(null);
      setLoading(false); // Stop loading if no token
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

  // Run fetchCurrentUser on initial load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Fetch all users whenever needed
  useEffect(() => {
    fetchUsers();
  }, []);

  const { data: postData, loading: postLoading } = useFetch("posts");

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
        authModel,
        setAuthModel,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default Context;

export const Blog = () => useContext(BlogContext);
