// import React, { useState, useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import axiosInstance from "../../../axiosInstance";
// import { Blog } from "../../../Context/Context";
// import { FaHeart, FaComment, FaShare } from "react-icons/fa";
// import Comments from "../Comments/Comments";
// import FollowBtn from "../../Home/UserToFollow/FollowBtn";

// const ReelTemplate = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expanded, setExpanded] = useState({});
//   const videoRefs = useRef({}); 
//   const { currentUser } = Blog();

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get("/videos");
//         const videosWithFullPath = response.data.map((video) => ({
//           ...video,
//           videoUrl: `http://localhost:5001${video.videoPath}`,
//         }));
//         setVideos(videosWithFullPath);
//       } catch (error) {
//         toast.error("Failed to load videos. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   // Function to handle video play/pause based on visibility
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const videoElement = entry.target;
//           if (entry.isIntersecting) {
//             videoElement.play();
//           } else {
//             videoElement.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } 
//     );

    
//     Object.values(videoRefs.current).forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => observer.disconnect();
//   }, [videos]);

//   const handleLike = (videoId) => {
//     toast.success(`Liked video ${videoId}!`);
//   };

//   const handleShare = (videoId) => {
//     toast.info(`Shared video ${videoId}!`);
//   };

//   const toggleExpanded = (videoId) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [videoId]: !prev[videoId],
//     }));
//   };

//   return (
//     <div className="w-full h-screen overflow-y-scroll bg-black flex flex-col items-center">
//       {loading ? (
//         <p className="text-center mt-10 text-white">Loading videos...</p>
//       ) : videos.length > 0 ? (
//         videos.map((video) => (
//           <div
//             key={video._id}
//             className="w-full max-w-[500px] bg-gray-800 rounded-xl mb-10 p-4 shadow-lg"
//           >
//             <div className="w-full">
//               <video
//                 ref={(el) => (videoRefs.current[video._id] = el)} // Assign refs dynamically
//                 className="w-full h-[70vh] object-cover rounded-lg"
//                 src={video.videoUrl}
//                 controls
//                 loop
//                 muted
//                 controlsList="nodownload noremoteplayback"
//               ></video>
//             </div>

//             <div className="mt-4 flex items-center gap-3">
//               <img
//                 className="w-12 h-12 rounded-full object-cover cursor-pointer"
//                 src={video.userProfileImage || "/default-avatar.png"}
//                 alt="user-profile"
//                 onClick={() => (window.location.href = `/profile/${video.userId}`)}
//               />
//               <div>
//                 <h4 className="text-lg font-semibold text-white">
//                   {video.username || "Unknown User"}
//                 </h4>
//                 <p className="text-sm text-gray-300">
//                   {new Date(video.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               {currentUser && String(currentUser.id) !== String(video.userId) && (
//                 <FollowBtn userId={video.userId} />
//               )}
//             </div>

//             <div className="mt-4 flex justify-around text-white">
//               <button
//                 onClick={() => handleLike(video._id)}
//                 className="flex items-center justify-center text-red-500"
//               >
//                 <FaHeart size={24} />
//               </button>
//               <button
//                 onClick={() => toast.info(`Comments for video ${video._id}`)}
//                 className="flex items-center justify-center text-blue-500"
//               >
//                 <FaComment size={24} />
//               </button>
//               <button
//                 onClick={() => handleShare(video._id)}
//                 className="flex items-center justify-center text-green-500"
//               >
//                 <FaShare size={24} />
//               </button>
//             </div>

//             <div className="mt-4 text-center">
//               <button
//                 onClick={() => toggleExpanded(video._id)}
//                 className="text-white underline"
//               >
//                 {expanded[video._id] ? "Hide Details" : "Show Details"}
//               </button>
//             </div>

//             {expanded[video._id] && (
//               <div className="mt-4 text-white text-sm">
//                 <p className="mb-2">{video.description || "No description provided."}</p>
//                 <p className="text-gray-400">
//                   {video.tags ? `Tags: ${video.tags.join(", ")}` : "No tags available"}
//                 </p>
//               </div>
//             )}

//             <div className="w-full h-[1px] bg-gray-700 mt-8"></div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center mt-10 text-white">No videos available.</p>
//       )}
//     </div>
//   );
// };

// export default ReelTemplate;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import axiosInstance from '../../../axiosInstance';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axiosInstance.get(`/videos/${videoId}`);
        setVideo(response.data);

        // Fetch recommended videos based on tags and author
        const recommendations = await axiosInstance.get('/videos', {
          params: {
            tags: response.data.tags.join(','),
            author: response.data.username,
          },
        });
        setRecommendedVideos(recommendations.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex bg-gray-900 text-white">
      {/* Main Video Section */}
      <div className="w-3/4 p-8">
        {video && (
          <div>
            <video
              className="w-full h-auto rounded-lg"
              src={video.videoUrl}
              controls
            ></video>
            <h1 className="text-3xl font-bold mt-4">{video.title}</h1>
            <p className="text-gray-400 mt-2">{video.description}</p>

            <div className="flex items-center gap-4 mt-4">
              <button className="flex items-center gap-2 text-red-500">
                <FaHeart /> {video.likes}
              </button>
              <button className="flex items-center gap-2 text-blue-500">
                <FaComment /> {video.comments.length}
              </button>
              <button className="flex items-center gap-2 text-green-500">
                <FaShare /> Share
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Videos Section */}
      <div className="w-1/4 p-8 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
        {recommendedVideos.map((recVideo) => (
          <div
            key={recVideo._id}
            className="flex items-center gap-4 mb-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
            onClick={() => (window.location.href = `/videos/${recVideo._id}`)}
          >
            <img
              src={recVideo.thumbnailUrl}
              alt={recVideo.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{recVideo.title}</h3>
              <p className="text-gray-400 text-sm">{recVideo.username}</p>
              <p className="text-gray-400 text-sm">{recVideo.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayerPage;
