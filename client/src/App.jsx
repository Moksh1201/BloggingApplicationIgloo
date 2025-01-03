import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';  
import "react-toastify/dist/ReactToastify.css";  
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
import UploadVideo from "./components/Common/ShortVideos/uploadvideo";
import PaymentPage from "./components/Common/premium/PaymentPage";
import VideoDashBoard from "./components/Common/ShortVideos/VideoDashBoard";
import VideoPlayerPage from "./components/Common/ShortVideos/VideoPlayerPage";

function App() {
  const { currentUser, loading } = Blog();

  useEffect(() => {
    console.log("Current User:", currentUser);
    console.log("Loading State:", loading);
  }, [currentUser, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ element }) => (
    currentUser ? element : <Navigate to="/demo" />
  );

  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      
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
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/profile/:userId" element={<Profile />} />

        <Route path="/write" element={<PrivateRoute element={<Write />} />} />
        <Route path="/editPost/:postId" element={<PrivateRoute element={<EditPost />} />} />

        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/filter/:tag" element={<FilterPost />} />
        <Route path="/add-admin" element={<PrivateRoute element={<AddAdmin />} />} />
        <Route path="/admin-posts" element={<PrivateRoute element={<AdminPosts />} />} />
        <Route path="/delete-users" element={<PrivateRoute element={<DeleteUser />} />} />
        
        <Route path="/Videos" element={<Vibes />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/videoDashboard" element={<VideoDashBoard />} />


        <Route path="*" element={<Navigate to={currentUser ? "/" : "/demo"} />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </>
  );
}

export default App;


