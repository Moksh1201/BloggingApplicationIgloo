import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Blog } from "../../../Context/Context";
import axiosInstance from "../../../axiosInstance";

const Vibes = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddVideoPopup, setShowAddVideoPopup] = useState(false); // Pop-up state
  const [newVideo, setNewVideo] = useState({ title: "", description: "", file: null }); // Video form state
  const { currentUser } = Blog();
  const navigate = useNavigate();

  // Fetch short videos
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/short-videos");
        setVideos(response.data);
      } catch (error) {
        toast.error("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Handle video upload
  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.file) {
      toast.error("Please provide all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", currentUser.id);
      formData.append("title", newVideo.title);
      formData.append("description", newVideo.description);
      formData.append("video", newVideo.file);

      await axiosInstance.post("/short-videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Video uploaded successfully!");
      setShowAddVideoPopup(false);
      setNewVideo({ title: "", description: "", file: null });
      setVideos((prev) => [...prev, newVideo]); // Optimistically update UI
    } catch (error) {
      toast.error("Error uploading video. Please try again.");
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-center mb-6">Trending Short Videos</h1>

      {/* Add Video Button */}
      <button
        onClick={() => setShowAddVideoPopup(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
      >
        Add Video
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading videos...</p>
      ) : videos.length > 0 ? (
        <div className="space-y-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:scale-105"
            >
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
              </div>
              <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" controls src={video.videoUrl} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No videos available.</p>
      )}

      {/* Add Video Popup */}
      {showAddVideoPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 shadow-lg relative">
            <button
              onClick={() => setShowAddVideoPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Upload New Video</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Video Title"
                className="w-full p-2 border rounded-md"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              />
              <textarea
                placeholder="Video Description (optional)"
                className="w-full p-2 border rounded-md"
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setNewVideo({ ...newVideo, file: e.target.files[0] })}
              />
            </div>
            <button
              onClick={handleAddVideo}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vibes;
