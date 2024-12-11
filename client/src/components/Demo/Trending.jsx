import React, { useState, useEffect } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { readTime } from "../../utils/helper";
import Loading from "../Loading/Loading";

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/posts/latest");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <section className="border-b border-gray-600">
      <div className="size py-[2rem]">
        <div className="flex items-center gap-3 font-semibold">
          <span>
            <BsGraphUpArrow />
          </span>
          <h2>Latest Posts</h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-card gap-3">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <Post key={post.id} post={post} index={i} />
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const Post = ({ post, index }) => {
  const navigate = useNavigate();
  return (
    <main className="flex gap-4 w-full">
      <span className="text-gray-400 text-4xl mt-4">{index + 1}</span>
      <div className="py-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate(`/profile/${post?.userId}`)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-75">
            <img
              className="w-[1.3rem] h-[1.3rem] object-cover rounded-full"
              src={post?.userImg}
              alt="userImg"
            />
            <h2 className="font-semibold text-sm capitalize">
              {post?.username}
            </h2>
          </div>
        </div>
        <div
          onClick={() => navigate(`/post/${post?.id}`)}
          className="flex flex-col gap-4 cursor-pointer hover:opacity-75">
          <p className="w-full md:w-[18rem] text-md font-bold line-clamp-2">
            {post.title}
          </p>
          <p className="text-gray-500 text-xs">
            {moment(post?.created).format("MMM YY")}
            {` ${readTime(post.desc)} min read`}
          </p>
        </div>
      </div>
    </main>
  );
};

export default LatestPosts;
