import React, { useEffect, useState } from "react";
import { Blog } from "../../../../Context/Context";
import axiosInstance from "../../../../axiosInstance"; 
import Loading from "../../../Loading/Loading";
import PostsCard from "../../../Common/Posts/PostsCard";
import { BiLock } from "react-icons/bi";

const ProfileLists = ({ getUserData }) => {
  const { currentUser } = Blog();
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        setLoading(true);

        if (!currentUser || !currentUser.id) {
          console.error("Current user not found or incomplete data");
          return;
        }

        const userId = currentUser.id;  

        const response = await axiosInstance.get(`/favorites/${userId}/favorites`);

        const favoritePostsDetails = await Promise.all(
          response.data.map(async (fav) => {
            const postResponse = await axiosInstance.get(`/posts/${fav.postId}`);
            return postResponse.data;
          })
        );

        setFavoritePosts(favoritePostsDetails);
      } catch (err) {
        console.error("Error fetching favorite posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePosts();
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">Error loading favorite posts: {error}</p>;
  }

  return (
    <div>
      {favoritePosts.length === 0 ? (
        <p className="text-gray-500">
          <span className="capitalize mr-1">{getUserData?.username}</span>{" "}
          has no saved posts.
        </p>
      ) : (
        <div className="flex flex-col gap-[2rem] mb-[2rem]">
          {favoritePosts.map((post) => (
            <PostsCard key={post.id || post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileLists;

const PrivateLists = ({ username }) => (
  <div className="flex flex-col justify-center items-center gap-[3rem] text-center">
    <p>
      <span className="capitalize">{username}'s saved posts are private.</span>
    </p>
    <span className="text-[10rem] text-gray-500">
      <BiLock />
    </span>
  </div>
);
