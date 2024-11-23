import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
import { Blog } from '../../../Context/Context';
import FollowBtn from '../../Home/UserToFollow/FollowBtn';
import { readTime } from '../../../utils/helper';
import moment from 'moment/moment';
import Actions from '../Posts/Actions/Actions'; 
import Like from './Actions/Like';
import Comment from './Actions/Comment';
import SharePost from './Actions/SharePost';
import SavedPost from '../Posts/Actions/SavedPost';
import Recommended from './Recommended';
import Comments from '../Comments/Comments';
import axiosInstance from '../../../axiosInstance';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = Blog();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        const postData = response.data;
        console.log('Post Data:', postData);

        if (postData.image) {
          console.log('Raw Image Data:', postData.image);
          setImage(postData.image);
        }
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const { title, content, updatedAt, userId } = post || {};

  console.log('Post Content:', content);
  console.log('Post Title:', title);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                onClick={() => navigate(`/profile/${userId}`)}
                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
                src={image} 
                alt="user-img"
              />
              <div>
                <div className="capitalize">
                  <span>{userId} .</span>
                  {currentUser && currentUser.id !== userId && (
                    <FollowBtn userId={userId} />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {readTime({ __html: content })} min read .
                  <span className="ml-1">{moment(updatedAt).fromNow()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]">
              <div className="flex items-center gap-5">
                <Like postId={postId} />
                <Comment />
              </div>
              <div className="flex items-center pt-2 gap-5">
                {post && <SavedPost post={post} />}
                <SharePost />
                {currentUser && currentUser.userId === userId && (
                  <Actions postId={postId} title={title} content={content} userId={userId} />
                )}
              </div>
            </div>
            <div className="mt-[3rem]">
              {image ? (
                <img
                  className="w-full h-[400px] object-cover"
                  src={image}
                  alt="post-img"
                />
              ) : (
                <p>No image available for this post.</p>
              )}
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </section>
          {<Recommended />}
          <Comments postId={postId} />
        </>
      )}
    </>
  );
};

export default SinglePost;

