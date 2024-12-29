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

        <Route path="*" element={<Navigate to={currentUser ? "/" : "/demo"} />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </>
  );
}

export default App;


// import React, { useState, useRef, useEffect } from 'react';

// const VideoDashboard = () => {
//   const [category, setCategory] = useState('All');
//   const carouselRef = useRef(null);

//   const categories = ['All', 'Comedy', 'Entertainment', 'Education', 'Sports', 'Travel', 'Blog', 'Information', 'Anime', 'Study'];
//   const videos = [
//     { id: 1, title: 'Funny Video', category: 'Comedy', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 2, title: 'Movie Clip', category: 'Entertainment', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 3, title: 'Tutorial', category: 'Education', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 4, title: 'Football Highlights', category: 'Sports', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 5, title: 'Travel Vlog', category: 'Travel', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 6, title: 'Daily Blog', category: 'Blog', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 7, title: 'Information Video', category: 'Information', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 8, title: 'Anime Clip', category: 'Anime', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 9, title: 'Study Tips', category: 'Study', thumbnail: 'https://via.placeholder.com/200' },
//   ];

//   const filteredVideos = category === 'All' ? videos : videos.filter(video => video.category === category);

//   // Function to handle pausing/resuming the scroll animation based on the category filter
//   useEffect(() => {
//     const carousel = carouselRef.current;

//     const handleMouseEnter = () => {
//       carousel.style.animationPlayState = 'paused'; // Pause the animation when hovered
//     };

//     const handleMouseLeave = () => {
//       carousel.style.animationPlayState = 'running'; // Resume the animation when hover ends
//     };

//     // Pause the animation when a filter is applied (except 'All')
//     if (category !== 'All') {
//       carousel.style.animationPlayState = 'paused';
//     } else {
//       carousel.style.animationPlayState = 'running';
//     }

//     // Add event listeners to handle hover events
//     carousel.addEventListener('mouseenter', handleMouseEnter);
//     carousel.addEventListener('mouseleave', handleMouseLeave);

//     // Cleanup event listeners on component unmount
//     return () => {
//       carousel.removeEventListener('mouseenter', handleMouseEnter);
//       carousel.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [category]); // This will run every time the category filter changes

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto flex justify-start items-center px-6">
//           <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">
//             Vibes
//           </h1>
//         </div>
//       </header>

//       {/* Categories Carousel */}
//       <div className="overflow-hidden relative py-4">
//         <div
//           className="flex gap-4"
//           style={{
//             display: 'flex',
//             overflowX: 'hidden',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           {categories.map((cat, index) => (
//             <div
//               key={index}
//               className={`px-6 py-3 text-center text-lg font-semibold cursor-pointer rounded-lg transition-transform duration-300 bg-gray-800 text-white shadow-md ${
//                 category === cat ? 'bg-blue-500' : ''
//               }`}
//               onClick={() => setCategory(cat)}
//             >
//               {cat}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Video Carousel */}
//       <div className="overflow-hidden relative py-8">
//         <div
//           ref={carouselRef}
//           className="flex gap-4"
//           style={{
//             display: 'flex',
//             overflowX: 'hidden',
//             whiteSpace: 'nowrap',
//             scrollBehavior: 'smooth',
//             animation: category === 'All' ? 'scroll-left 50s linear infinite' : 'none', // Apply animation only when 'All' is selected
//             width: `${Math.max(filteredVideos.length * 350, 1000)}px`, // Make sure width adjusts based on the number of videos and is at least 1000px
//           }}
//         >
//           {filteredVideos.concat(filteredVideos).map((video, index) => (
//             <div
//               key={index}
//               className="min-w-[350px] bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-110 hover:mx-2 hover:shadow-xl"
//             >
//               <img
//                 src={video.thumbnail}
//                 alt={video.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{video.title}</h3>
//                 <p className="text-sm text-gray-400">Category: {video.category}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add a keyframe for smooth scrolling */}
//       <style>
//         {`
//           @keyframes scroll-left {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-100%);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default VideoDashboard;
