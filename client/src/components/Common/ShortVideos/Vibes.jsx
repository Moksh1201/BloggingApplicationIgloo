import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Blog } from "../../../Context/Context";
import Like from "../Posts/Actions/Like";
import Comment from "../Comments/Comment";
import SharePost from "../Posts/Actions/SharePost";
import SavedPost from "../Posts/Actions/SavedPost";
import FollowBtn from "../../Home/UserToFollow/FollowBtn";
import axiosInstance from "../../../axiosInstance";

const Vibes = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = Blog();
  const navigate = useNavigate();

  // Fetch short videos
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/short-videos");
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("Failed to load videos. Please try again.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-center mb-6">Trending Short Videos</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading videos...</p>
      ) : videos.length > 0 ? (
        <div className="space-y-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:scale-105"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  src={video.userProfileImage || "/default-avatar.png"}
                  alt="user-profile"
                  onClick={() => navigate(`/profile/${video.userId}`)}
                />
                <div>
                  <h4 className="text-lg font-semibold">{video.userName}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(video.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                {currentUser && currentUser.id !== video.userId && (
                  <FollowBtn userId={video.userId} />
                )}
              </div>

              {/* Video Content */}
              <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  src={video.videoUrl}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4">
                  <Like postId={video.id} />
                  <Comment postId={video.id} />
                </div>
                <div className="flex gap-4">
                  <SavedPost postId={video.id} />
                  <SharePost postId={video.id} />
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-4">
                <p className="font-semibold text-lg">Comments</p>
                {/* Replace the following with dynamic comments */}
                {video.comments && video.comments.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {video.comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700"
                      >
                        <strong>{comment.userName}: </strong>
                        {comment.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No videos available.</p>
      )}
    </div>
  );
};

export default Vibes;
