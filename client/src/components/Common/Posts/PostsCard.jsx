// import React from "react";
// import { readTime } from "../../../utils/helper";
// import moment from "moment";
// import SavedPost from "./Actions/SavedPost";
// import { Blog } from "../../../Context/Context";
// import Actions from "./Actions/Actions";
// import { useNavigate } from "react-router-dom";

// const PostsCard = ({ post }) => {
//   const { title, desc, created, postImg, id: postId, userId, username } = post;
//   const { currentUser } = Blog();

//   const navigate = useNavigate();

//   return (
//     <section>
//       <div
//         onClick={() => navigate(`/posts/${postId}`)}
//         className="flex flex-col sm:flex-row gap-4 cursor-pointer"
//       >
//         <div className="flex-[2.5]">
//           <p className="pb-2 font-semibold capitalize">{username}</p>
//           <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
//             {title}
//           </h2>
//           <div
//             className="py-1 text-gray-500 line-clamp-2 leading-5"
//             dangerouslySetInnerHTML={{ __html: desc }}
//           />
//         </div>
//         {postImg && (
//           <div className="flex-[1]">
//             <img
//               src={postImg}
//               alt="postImg"
//               className="w-[53rem] h-[8rem] object-cover"
//             />
//           </div>
//         )}
//       </div>
//       <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
//         <p className="text-xs text-gray-600">
//           {readTime({ __html: desc })} min read . {moment(created).format("MMM DD")}
//         </p>
//         <div className="flex items-center gap-3">
//           <SavedPost post={post} />
//           {currentUser?.uid === userId && (
//             <Actions postId={postId} title={title} desc={desc} />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PostsCard;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../../axiosInstance';
// import { Blog } from '../../../Context/Context';

// const PostsCard = ({ post }) => {
//   // Debugging: Log the entire post object to check if it contains the correct data
//   console.log("Received post object:", post);

//   // Safely destructure post fields and use default destructuring with a fallback for safety
//   const { title, desc, created, postImg, _id: postId, userId, username } = post || {};

//   // Debugging: Log the destructured postId to ensure it's correctly obtained
//   console.log("Post ID:", postId);

//   const { currentUser } = Blog();
//   const navigate = useNavigate();

//   // Function to handle the click event on a post, triggering navigation to the post's detail page
//   const handlePostClick = async () => {
//     if (!postId) {
//       console.error("Error: postId is undefined");
//       return;
//     }

//     try {
//       // Debugging: Log the API endpoint being called
//       console.log(`Fetching post data from: /posts/${postId}`);

//       // Fetch the post data from the API
//       const response = await axiosInstance.get(`/posts/${postId}`);
//       const fetchedPost = response.data;

//       // Debugging: Log the fetched post data
//       console.log("Fetched post data:", fetchedPost);

//       // Navigate to the SinglePost page with the fetched post data
//       navigate(`/posts/${postId}`, { state: { post: fetchedPost } });
//     } catch (error) {
//       // Debugging: Log any errors that occur during the fetch
//       console.error("Error fetching post data:", error);
//     }
//   };

//   return (
//     <section>
//       <div onClick={handlePostClick} className="flex flex-col sm:flex-row gap-4 cursor-pointer">
//         <div className="flex-none w-full sm:w-64 md:w-96 h-56 sm:h-auto overflow-hidden rounded-lg">
//           <img
//             src={postImg}
//             alt={title}
//             className="object-cover w-full h-full"
//           />
//         </div>
//         <div className="flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-semibold">{title}</h3>
//             <p className="text-sm text-gray-500">{created}</p>
//             <p className="text-gray-700 mt-2">{desc}</p>
//           </div>
//           <div className="flex justify-between mt-4">
//             <p className="text-sm text-gray-500">By {username}</p>
//             {/* Other post actions */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PostsCard;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../../axiosInstance';
// import { Blog } from '../../../Context/Context';
// import Actions from './Actions/Actions'; // Ensure Actions is correctly imported

// const PostsCard = ({ post }) => {
//   // Log the received post object for debugging
//   console.log("Received post object:", post);

//   // Destructure post properties with default empty object fallback
//   const { title, desc, created, image, _id: postId, userId, username } = post || {};
  
//   // Log post ID and image data for debugging
//   console.log("Post ID:", postId);
//   console.log("Image Data:", image);

//   // Get the current user from context
//   const { currentUser } = Blog();
//   const navigate = useNavigate();

//   // Handle post click to fetch and navigate to the post details page
//   const handlePostClick = async () => {
//     if (!postId) {
//       console.error("Error: postId is undefined");
//       return;
//     }

//     try {
//       // Log the URL for debugging
//       console.log(`Fetching post data from: /posts/${postId}`);
      
//       // Fetch the post data from the API
//       const response = await axiosInstance.get(`/posts/${postId}`);
//       const fetchedPost = response.data;
      
//       // Log the fetched post data for debugging
//       console.log("Fetched post data:", fetchedPost);

//       // Navigate to the post details page with fetched data
//       navigate(`/posts/${postId}`, { state: { post: fetchedPost } });
//     } catch (error) {
//       // Log any errors encountered during the fetch operation
//       console.error("Error fetching post data:", error);
//     }
//   };

//   // Process image data to ensure it has the correct data URL prefix
//   const processImageData = (imageData) => {
//     if (imageData && !imageData.startsWith('data:image/')) {
//       return `data:image/png;base64,${imageData}`;
//     }
//     return imageData;
//   };

//   return (
//     <section className="border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer">
//       <div onClick={handlePostClick} className="flex flex-col sm:flex-row gap-4 p-4">
//         {/* Image section */}
//         <div className="flex-none w-full sm:w-64 md:w-96 h-48 sm:h-64 overflow-hidden rounded-lg">
//           <img
//             src={processImageData(image)}
//             alt={title}
//             className="object-cover w-full h-full"
//             style={{ maxWidth: "100%", height: "auto" }}
//             // Log errors if the image fails to load
//             onError={(e) => console.log("Error loading image:", e)}
//           />
//         </div>
        
//         {/* Post details section */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-semibold mb-2">{title}</h3>
//             <p className="text-sm text-gray-500 mb-2">{created}</p>
//             <p className="text-gray-700">{desc}</p>
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <p className="text-sm text-gray-500">By {userId}</p>
//           </div>
//           {currentUser?.username === userId && ( // Ensure currentUser.userId is used for comparison
//             <div className="flex justify-end items-center">
//               <Actions postId={postId} title={title} desc={desc} postUserId={userId} />
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PostsCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { Blog } from '../../../Context/Context';
import Actions from './Actions/Actions'; // Ensure Actions is correctly imported

const PostsCard = ({ post }) => {
  const { title, desc, created, image, _id: postId, userId, username } = post || {};
  const { currentUser } = Blog();
  const navigate = useNavigate();

  const handlePostClick = async () => {
    if (!postId) {
      console.error("Error: postId is undefined");
      return;
    }

    try {
      const response = await axiosInstance.get(`/posts/${postId}`);
      const fetchedPost = response.data;
      navigate(`/posts/${postId}`, { state: { post: fetchedPost } });
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const processImageData = (imageData) => {
    if (imageData && !imageData.startsWith('data:image/')) {
      return `data:image/png;base64,${imageData}`;
    }
    return imageData;
  };

  return (
    <section className="border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div onClick={handlePostClick} className="flex flex-col sm:flex-row gap-4 p-4">
        <div className="flex-none w-full sm:w-64 md:w-96 h-48 sm:h-64 overflow-hidden rounded-lg">
          <img
            src={processImageData(image)}
            alt={title}
            className="object-cover w-full h-full"
            style={{ maxWidth: "100%", height: "100%" }}
            onError={(e) => console.log("Error loading image:", e)}
          />
        </div>
        
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">{created}</p>
            <p className="text-gray-700">{desc}</p>
          </div>
          <div className="flex justify-between items-center mt-4 relative">
            <p className="text-sm text-gray-500">By {userId}</p>
            {currentUser?.username === userId && (
              <div className="absolute bottom-20 right-20 mt-2 mr-2 z-10" onClick={(e) => e.stopPropagation()}>
                <Actions postId={postId} title={title} desc={desc} postUserId={userId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostsCard;
