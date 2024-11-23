import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { Blog } from '../../../Context/Context';
import Actions from './Actions/Actions';

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
