
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../../../Context/Context';
import Actions from './Actions/Actions';
import axiosInstance from '../../../axiosInstance';

const PostsCard = ({ post, setFilteredPost }) => {
  const { title, desc, created, images, _id: postId, userId } = post || {};
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
      setFilteredPost(title); // This will filter the topic card
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath && Array.isArray(imagePath) && imagePath.length > 0) {
      return `http://localhost:5001${imagePath[0]}`;
    }
    return '/default-image.png'; 
  };

  return (
    <section
      onClick={handlePostClick}
      className="border border-gray-300 rounded-lg shadow-md bg-white cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
    >
      <div className="flex flex-col sm:flex-row gap-4 p-6">
        <div className="flex-none w-full sm:w-64 md:w-96 h-48 sm:h-64 overflow-hidden rounded-lg">
          <img
            src={getImageUrl(images)}
            alt={title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">{created}</p>
            <p className="text-gray-700">{desc}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">By {userId}</p>
            {currentUser?.username === userId && (
              <div className="mt-2">
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
