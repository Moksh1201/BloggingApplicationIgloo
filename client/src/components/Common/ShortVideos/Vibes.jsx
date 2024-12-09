// import React from "react";
// import ReelTemplate from "./VibeTemplate";
// import { useNavigate } from "react-router-dom";

// const Vibes = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full h-screen bg-black relative">
//       <h1 className="text-4xl font-bold text-center text-white py-4">
//         Trending Vibes
//       </h1>

//       {/* Upload Video Button */}
//       <div className="absolute top-8 right-4">
//         <button
//           onClick={() => navigate("/upload-video")}
//           className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
//         >
//           Upload Video
//         </button>
//       </div>
//       <br></br>
//       <ReelTemplate />
//     </div>
//   );
// };

// export default Vibes;

import React, { useContext } from "react";
import ReelTemplate from "./VibeTemplate";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../Context/Context"; // Assuming Blog provides user context

const Vibes = () => {
  const navigate = useNavigate();
  const { currentUser } = Blog(); // Get the current user from context

  const isPremiumUser = currentUser?.isPremium; // Check premium status (assuming `isPremium` is a field in `currentUser`)

  return (
    <div className="w-full h-screen bg-black relative">
      <h1 className="text-4xl font-bold text-center text-white py-4">
        Trending Vibes
      </h1>

      {/* Upload Video Button */}
      {isPremiumUser && ( // Render only if the user is premium
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
