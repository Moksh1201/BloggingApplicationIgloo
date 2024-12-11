import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import PostsCard from "./PostsCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        console.log("Fetched posts:", response.data);
        setPosts(response.data);
        setFilteredPosts(response.data); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        const title = post.title || "";
        const description = post.description || "";

        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      const sortedFilteredPosts = filtered.sort((a, b) => {
        const aMatch =
          (a.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (a.description || "").toLowerCase().includes(searchTerm.toLowerCase());
        const bMatch =
          (b.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (b.description || "").toLowerCase().includes(searchTerm.toLowerCase());

        return bMatch - aMatch;
      });

      setFilteredPosts(sortedFilteredPosts);
    }
  }, [searchTerm, posts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <p className="text-center text-xl text-gray-700">Loading posts...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Updated Heading */}
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8 tracking-tight">
        Latest Posts
      </h2>

      <input
      type="text"
      placeholder="Search posts..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full sm:w-64 mx-auto p-2 text-lg border-2 border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 mb-4"
    />

    <hr className="border-gray-300 mb-6" />


      {filteredPosts.length === 0 ? (
        <p className="text-center text-xl text-gray-700 opacity-75">No posts available.</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} className="mb-6">
            <PostsCard post={post} />
            <hr className="border-gray-300 my-4" /> 
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
