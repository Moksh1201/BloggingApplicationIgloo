import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import { Blog } from "../../../Context/Context";

const UploadVideo = () => {
  const [videoData, setVideoData] = useState({ title: "", description: "", tags: "", file: null });
  const { currentUser } = Blog();
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!videoData.title || !videoData.file) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {

      const tagsArray = videoData.tags ? videoData.tags.split(",").map(tag => tag.trim()) : [];

      const formData = new FormData();
      formData.append("userId", currentUser.id); 
      formData.append("username", currentUser.username); 
      formData.append("title", videoData.title);
      formData.append("description", videoData.description || ""); 
      formData.append("tags", JSON.stringify(tagsArray)); 
      formData.append("video", videoData.file);

      await axiosInstance.post("/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Video uploaded successfully!");
      navigate("/"); 
    } catch (error) {
      toast.error("Error uploading video. Please try again.");
    }
  };

  return (
    <div className="w-[90%] md:w-[50%] mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Upload Video</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Video Title"
          className="w-full p-2 border rounded-md"
          value={videoData.title}
          onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
        />
        <textarea
          placeholder="Video Description (optional)"
          className="w-full p-2 border rounded-md"
          value={videoData.description}
          onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags (optional)"
          className="w-full p-2 border rounded-md"
          value={videoData.tags}
          onChange={(e) => setVideoData({ ...videoData, tags: e.target.value })}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoData({ ...videoData, file: e.target.files[0] })}
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
