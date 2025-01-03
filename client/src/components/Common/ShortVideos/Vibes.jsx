import React, { useContext } from "react";
import VideoPlayerPage from "./VideoPlayerPage";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../Context/Context"; 

const Vibes = () => {
  const navigate = useNavigate();
  const { currentUser } = Blog(); 

  const isPremiumUser = currentUser?.isPremium; 

  return (
    <div className="w-full h-screen bg-black relative">
      <br></br>
      <VideoPlayerPage />
    </div>
  );
};

export default Vibes;
