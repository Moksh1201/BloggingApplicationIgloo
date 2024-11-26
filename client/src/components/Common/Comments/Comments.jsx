
// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../../axiosInstance";
// import Modal from "../../../utils/Modal";
// import { LiaTimesSolid } from "react-icons/lia";
// import { Blog } from "../../../Context/Context";
// import Loading from "../../Loading/Loading";
// import Comment from "./Comment";

// const Comments = ({ postId }) => {
//   const { currentUser, showComment, setShowComment, setCommentLength, setCurrentUser } = Blog();
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("authToken");

//   // Define emojis
//   const emojis = ["😊", "😂", "😍", "😎", "😭", "😢", "😡", "🥺", "😜"];

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       if (!currentUser) {
//         try {
//           const response = await axiosInstance.get("/auth/me", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setCurrentUser(response.data);
//         } catch (error) {
//           console.error("Error fetching current user:", error);
//         }
//       }
//     };

//     fetchCurrentUser();
//   }, [token, currentUser, setCurrentUser]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axiosInstance.get(`/posts/${postId}/comments`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const commentsWithUserDetails = await Promise.all(
//           response.data.map(async (comment) => {
//             try {
//               const userResponse = await axiosInstance.get(`/users/${comment.userId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               return { ...comment, user: userResponse.data };
//             } catch {
//               return { ...comment, user: { username: "Unknown User", userImg: "/profile.jpg" } };
//             }
//           })
//         );
//         setComments(commentsWithUserDetails);
//         setCommentLength(commentsWithUserDetails.length);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, [postId, setCommentLength, token]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const response = await axiosInstance.post(
//         `/posts/${postId}/comments`,
//         { userId: currentUser.id, content: newComment },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const newCommentWithUser = { ...response.data, user: currentUser };
//       setComments([...comments, newCommentWithUser]);
//       setNewComment("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const handleCommentDelete = (commentId) => {
//     setComments((prev) => prev.filter((comment) => comment._id !== commentId));
//   };

//   const updateComment = (commentId, updatedContent) => {
//     setComments((prev) =>
//       prev.map((comment) => (comment._id === commentId ? { ...comment, content: updatedContent } : comment))
//     );
//   };

//   const closeModal = () => {
//     setShowComment(false);  // Close the modal and hide the comment input area
//   };

//   // Define handleEmojiClick to append selected emoji to the new comment
//   const handleEmojiClick = (emoji) => {
//     setNewComment((prevComment) => prevComment + emoji);
//   };

//   return (
//     <div>
//       {showComment && (
//         <Modal setModal={setShowComment} modal={showComment}>
//           <section className="fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadow-lg p-5 overflow-y-auto">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-gray-800">Responses ({comments.length})</h3>
//               <button onClick={closeModal} className="text-2xl hover:opacity-70">
//                 <LiaTimesSolid />
//               </button>
//             </div>

//             {currentUser && (
//               <form onSubmit={handleCommentSubmit} className="mt-4">
//                 <textarea
//                   className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Write a comment..."
//                   rows={3}
//                 />
//                 <div className="flex flex-wrap mt-2">
//                   {emojis.map((emoji, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() => handleEmojiClick(emoji)}
//                       className="text-2xl mr-2 mb-2"
//                     >
//                       {emoji}
//                     </button>
//                   ))}
//                 </div>
//                 <button type="submit" className="btn !bg-blue-500 !text-white mt-2 w-full py-2 rounded-lg">
//                   Comment
//                 </button>
//               </form>
//             )}

//             {loading ? (
//               <Loading />
//             ) : (
//               <div className="mt-4">
//                 {comments.map((comment) => (
//                   <Comment
//                     key={comment._id}
//                     item={comment}
//                     postId={postId}
//                     handleCommentDelete={handleCommentDelete}
//                     updateComment={updateComment}
//                   />
//                 ))}
//               </div>
//             )}
//           </section>
//         </Modal>
//       )}

//       {/* The rest of the page content */}
//       <div className="your-other-content">
//         {/* Place other content here */}
//       </div>
//     </div>
//   );
// };

// export default Comments;

import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from "../../../Context/Context";
import Loading from "../../Loading/Loading";
import Comment from "./Comment";
import moment from "moment";  // Import moment for formatting timestamps

const Comments = ({ postId }) => {
  const { currentUser, showComment, setShowComment, setCommentLength, setCurrentUser } = Blog();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  // Fetch the current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!currentUser) {
        try {
          const response = await axiosInstance.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, [token, currentUser, setCurrentUser]);

  // Fetch the comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        // Debugging: Log the raw response data
        console.log("Fetched Comments:", response.data);
    
        const commentsWithFormattedTime = response.data.map((comment) => {
          console.log("Original createdAt:", comment.createdAt); // Log the raw createdAt value
          
          // Check if createdAt is a Unix timestamp or ISO string
          const isUnixTimestamp = comment.createdAt && comment.createdAt.toString().length === 10; // Unix timestamp is typically 10 digits long
          if (isUnixTimestamp) {
            console.log("Detected Unix timestamp, converting to ISO format");
            // If it's a Unix timestamp, convert it to milliseconds
            comment.createdAt = new Date(comment.createdAt * 1000).toISOString();
          }
    
          // Format the timestamp using moment.utc to handle time correctly across timezones
          const formattedTime = moment.utc(comment.createdAt).local().fromNow();
          console.log("Formatted createdAt:", formattedTime); // Log the formatted time
    
          return { ...comment, timestamp: formattedTime };
        });
    
        setComments(commentsWithFormattedTime);
        setCommentLength(commentsWithFormattedTime.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [postId, setCommentLength, token]);
  

  // Submit a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/posts/${postId}/comments`,
        { userId: currentUser.id, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Debugging: Log the response from adding a comment
      console.log("New Comment Added:", response.data);

      // Add the formatted timestamp to the new comment
      const newCommentWithFormattedTime = {
        ...response.data,
        timestamp: moment(response.data.createdAt).fromNow(),
      };
      
      // Add the new comment with the formatted time to the existing comments
      setComments([...comments, newCommentWithFormattedTime]);
      setNewComment("");  // Reset the comment input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle deleting a comment
  const handleCommentDelete = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));
  };

  // Handle updating a comment
  const updateComment = (commentId, updatedContent) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === commentId ? { ...comment, content: updatedContent } : comment
      )
    );
  };

  // Close the modal for comments
  const closeModal = () => {
    setShowComment(false);
  };

  // Handle emoji click for comments
  const handleEmojiClick = (emoji) => {
    setNewComment((prevComment) => prevComment + emoji);
  };

  return (
    <div>
      {showComment && (
        <Modal setModal={setShowComment} modal={showComment}>
          <section className="fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadow-lg p-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Responses ({comments.length})</h3>
              <button onClick={closeModal} className="text-2xl hover:opacity-70">
                <LiaTimesSolid />
              </button>
            </div>

            {currentUser && (
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                />
                <div className="flex flex-wrap mt-2">
                  {["😊", "😂", "😍", "😎", "😭", "😢", "😡", "🥺", "😜"].map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl mr-2 mb-2"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <button type="submit" className="btn !bg-blue-500 !text-white mt-2 w-full py-2 rounded-lg">
                  Comment
                </button>
              </form>
            )}

            {loading ? (
              <Loading />
            ) : (
              <div className="mt-4">
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    item={comment}
                    postId={postId}
                    handleCommentDelete={handleCommentDelete}
                    updateComment={updateComment}
                  />
                ))}
              </div>
            )}
          </section>
        </Modal>
      )}

      {/* The rest of the page content */}
      <div className="your-other-content">
        {/* Place other content here */}
      </div>
    </div>
  );
};

export default Comments;
