import React, { useContext } from "react";
import ReelTemplate from "./VibeTemplate";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../Context/Context"; 

const Vibes = () => {
  const navigate = useNavigate();
  const { currentUser } = Blog(); 

  const isPremiumUser = currentUser?.isPremium; 

  return (
    <div className="w-full h-screen bg-black relative">
      <h1 className="text-4xl font-bold text-center text-white py-4">
        Trending Vibes
      </h1>

      {/* Upload Video Button */}
      {isPremiumUser && ( 
        <div className="absolute top-8 right-4">
          <button
            onClick={() => navigate("/upload-video")}
            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
          >
            Upload Video
          </button>
        </div>
      )}
      <br></br>
      <ReelTemplate />
    </div>
  );
};

export default Vibes;
