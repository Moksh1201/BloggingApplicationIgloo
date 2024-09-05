import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import PostsCard from "../Common/Posts/PostsCard";

const FilterPost = () => {
  const { tag } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts?tag=${tag}`);
        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching filtered posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredPosts();
  }, [tag]);

  return (
    <section className="size my-[2rem]">
      <div>
        <h3 className="text-3xl pb-6 border-b border-black mb-[3rem]">
          {filteredData.length
            ? "Your Filtered Posts :"
            : "There is no post with this tag"}
        </h3>
        {loading ? (
          <Loading />
        ) : (
          <div className="lg:max-w-[60%] flex flex-col gap-[2rem]">
            {filteredData.map((post, i) => (
              <PostsCard post={post} key={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterPost;
