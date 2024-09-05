// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from "../../../utils/Modal";
// import { LiaTimesSolid } from "react-icons/lia";
// import { Blog } from "../../../Context/Context";
// import Loading from "../../Loading/Loading";
// import Comment from "./Comment";

// const Comments = ({ postId }) => {
//   const { currentUser, showComment, setShowComment, setCommentLength, allUsers, setCurrentUser } = Blog();
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Retrieve the token from local storage
//   const token = localStorage.getItem('authToken');

//   // Fetch current user when component mounts
//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       if (!currentUser) {
//         try {
//           const response = await axios.get('http://localhost:5001/api/auth/me', {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           console.log("Fetched Current User:", response.data); // Debugging log
//           setCurrentUser(response.data); // Set the current user in context
//         } catch (error) {
//           console.error("Error fetching current user:", error);
//         }
//       }
//     };

//     fetchCurrentUser();
//   }, [token, currentUser, setCurrentUser]);

//   useEffect(() => {
//     console.log("currentUser:", currentUser); // Debugging log
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/posts/${postId}/comments`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setComments(response.data);
//         setCommentLength(response.data.length);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, [postId, token, currentUser]);

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return; // Prevent submitting empty comments

//     console.log("handleCommentSubmit called");
//     console.log("currentUser in handleCommentSubmit:", currentUser); // Debugging log
//     console.log("currentUser ID:", currentUser?.id); // Check if currentUser has an id
//     console.log("Comment content:", newComment);

//     try {
//       // Check currentUser and token before making the request
//       if (!currentUser?.id) {
//         console.error("No user ID available");
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:5001/api/posts/${postId}/comments`, 
//         { 
//           userId: currentUser.id, // Ensure this is not undefined
//           content: newComment 
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setComments([...comments, response.data]);
//       setNewComment(''); // Clear input field
//     } catch (error) {
//       console.error("Error adding comment:", error.response ? error.response.data : error.message);
//     }
//   };

//   const handleCommentDelete = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/posts/${postId}/comments/${commentId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setComments(comments.filter(comment => comment.id !== commentId));
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   return (
//     <Modal setModal={setShowComment} modal={showComment}>
//       <section
//         className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5 overflow-y-auto transition-all duration-500 ${showComment ? "translate-x-0" : "translate-x-[23rem]"}`
//         }>
//         <div className="flex items-center justify-between">
//           <h3 className="text-xl font-bold">Responses ({comments.length})</h3>
//           <button onClick={() => setShowComment(false)} className="text-xl">
//             <LiaTimesSolid />
//           </button>
//         </div>
//         {currentUser && (
//           <div className="shadows p-3 my-5 overflow-hidden">
//             <div className="flex items-center gap-2 mb-5">
//               <img
//                 className="w-[2rem] h-[2rem] object-cover rounded-full"
//                 src={allUsers.find(user => user.id === currentUser.id)?.userImg || "/profile.jpg"}
//                 alt="user-img"
//               />
//               <h3 className="capitalize text-sm">{allUsers.find(user => user.id === currentUser.id)?.username}</h3>
//             </div>
//             <textarea
//               value={newComment}
//               onChange={handleCommentChange}
//               placeholder="What are your thoughts?"
//               className="w-full outline-none resize-none text-sm border px-2 pt-4"
//             />
//             <div className="flex items-center justify-end gap-4 mt-[1rem]">
//               <button onClick={() => setNewComment('')} className="text-sm">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCommentSubmit}
//                 className="btn !text-xs !bg-green-700 !text-white !rounded-full"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}
//         {loading ? (
//           <Loading />
//         ) : (
//           <div className="border-t py-4 mt-8 flex flex-col gap-8">
//             {comments.length > 0 ? (
//               comments.map((comment) => (
//                 <Comment
//                   key={comment.id}
//                   item={comment}
//                   postId={postId}
//                   handleCommentDelete={handleCommentDelete}
//                 />
//               ))
//             ) : (
//               <p>No comments yet</p>
//             )}
//           </div>
//         )}
//       </section>
//     </Modal>
//   );
// };

// export default Comments;
// Comments.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from "../../../Context/Context";
import Loading from "../../Loading/Loading";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const { currentUser, showComment, setShowComment, setCommentLength, allUsers, setCurrentUser } = Blog();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!currentUser) {
        try {
          const response = await axiosInstance.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, [token, currentUser, setCurrentUser]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(response.data);
        setCommentLength(response.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, setCommentLength, token]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUser) {
      console.error("User must be signed in to add a comment");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/posts/${postId}/comments`,
        {
          userId: currentUser.id,
          content: newComment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error.response ? error.response.data : error.message);
    }
  };

  const handleCommentDelete = async (commentId) => {
    console.log("Deleting comment with ID:", commentId); // Debug log

    if (!commentId) {
      console.error("Comment ID is missing.");
      return;
    }

    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal setModal={setShowComment} modal={showComment}>
      <section
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5 overflow-y-auto transition-all duration-500 ${showComment ? "translate-x-0" : "translate-x-[23rem]"}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Responses ({comments.length})</h3>
          <button onClick={() => setShowComment(false)} className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        {currentUser ? (
          <div className="shadows p-3 my-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <img
                className="w-[2rem] h-[2rem] object-cover rounded-full"
                src={allUsers.find(user => user.id === currentUser.id)?.userImg || "/profile.jpg"}
                alt="user-img"
              />
              <h3 className="capitalize text-sm">{allUsers.find(user => user.id === currentUser.id)?.username}</h3>
            </div>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="What are your thoughts?"
              className="w-full outline-none resize-none text-sm border px-2 pt-4"
            />
            <div className="flex items-center justify-end gap-4 mt-[1rem]">
              <button onClick={() => setNewComment('')} className="text-sm">
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                className="btn !text-xs !bg-green-700 !text-white !rounded-full"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <p>You must be signed in to add a comment</p>
        )}
        {loading ? (
          <Loading />
        ) : (
          <div className="border-t py-4 mt-8 flex flex-col gap-8">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  item={comment}
                  postId={postId}
                  handleCommentDelete={handleCommentDelete} // Pass the delete handler
                />
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        )}
      </section>
    </Modal>
  );
};

export default Comments;
