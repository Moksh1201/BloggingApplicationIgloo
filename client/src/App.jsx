import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Demo from "./components/Demo/Demo";
import HomeHeader from "./components/Home/Header/HomeHeader";
import DemoHeader from "./components/Demo/DemoHeader";
import { Blog } from "./Context/Context";
import Profile from "./components/Home/Profile/Profile";
import Write from "./components/Home/Write/Write";
import SinglePost from "./components/Common/Posts/SinglePost";
import EditPost from "./components/Common/Posts/EditPost";
import FilterPost from "./components/Demo/FilterPost";
import DeleteUser from "./components/Home/Header/DeleteUser";

import AdminPosts from "./components/Home/Header/AdminPosts";
import AddAdmin from "./components/Home/Header/AddAdmin";
import Vibes from "./components/Common/ShortVideos/Vibes";




function App() {
  const { currentUser, loading } = Blog();

  useEffect(() => {
    console.log("Current User:", currentUser );
    console.log("Loading State:", loading);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      {/* Persistent Chatbot Widget */}
      <div
        id="bp-web-widget"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1000",
        }}
      />
      <Routes>
        {/* Routes */}
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/demo" element={<Demo />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/write" element={currentUser ? <Write /> : <Navigate to="/demo" />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={currentUser ? <EditPost /> : <Navigate to="/demo" />} />
        <Route path="/filter/:tag" element={<FilterPost />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/admin-posts" element={<AdminPosts />} />
        <Route path="/delete-users" element={<DeleteUser />} />
        <Route path="/Videos" element={<Vibes />} />


        <Route path="*" element={<Navigate to={currentUser ? "/" : "/demo"} />} />
      </Routes>
    </>
  );
}

export default App;
