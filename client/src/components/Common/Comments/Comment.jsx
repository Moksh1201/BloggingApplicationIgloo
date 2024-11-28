// import React, { useState } from "react";
// import axiosInstance from "../../../axiosInstance";
// import { Blog } from "../../../Context/Context";
// import moment from "moment";
// import { BiDotsHorizontalRounded, BiReply } from "react-icons/bi";
// import DropDown from "../../../utils/DropDown";
// import { toast } from "react-toastify";

// const Comment = ({ item: comment, postId, addReply }) => {
//   const { currentUser } = Blog();
//   const [replyText, setReplyText] = useState("");
//   const [showReplyInput, setShowReplyInput] = useState(false);

//   const handleReplySubmit = async () => {
//     if (!replyText.trim()) return;

//     try {
//       const response = await axiosInstance.post(
//         `/posts/${postId}/comments`,
//         { content: replyText, parentCommentId: comment._id },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );
//       const newReply = {
//         ...response.data,
//         timestamp: moment(response.data.createdAt).fromNow(),
//       };
//       addReply(comment._id, newReply);
//       setReplyText("");
//       setShowReplyInput(false);
//     } catch (error) {
//       console.error("Error replying to comment:", error);
//     }
//   };

//   return (
//     <div className="p-3">
//       <div className="flex items-center">
//         <h2 className="text-sm font-bold">{comment.username}</h2>
//         <p className="text-sm text-gray-400 ml-2">{comment.timestamp}</p>
//       </div>
//       <p className="text-sm mt-1">{comment.content}</p>
//       <button
//         onClick={() => setShowReplyInput((prev) => !prev)}
//         className="text-blue-500 text-sm mt-1"
//       >
//         Reply
//       </button>

//       {showReplyInput && (
//         <div className="mt-2">
//           <textarea
//             className="w-full p-2 border rounded"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Write a reply..."
//           />
//           <button
//             onClick={handleReplySubmit}
//             className="btn bg-blue-500 text-white mt-1 py-1 px-4 rounded"
//           >
//             Submit
//           </button>
//         </div>
//       )}

//       {/* Render replies */}
//       {comment.replies?.length > 0 && (
//         <div className="ml-4 mt-2">
//           {comment.replies.map((reply) => (
//             <Comment key={reply._id} item={reply} postId={postId} addReply={addReply} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// export default Comment;

// import React, { useState } from "react";
// import axiosInstance from "../../../axiosInstance";
// import { Blog } from "../../../Context/Context";
// import moment from "moment";
// import { BiDotsHorizontalRounded, BiReply } from "react-icons/bi";
// import DropDown from "../../../utils/DropDown";
// import { toast } from "react-toastify";

// const Comment = ({ item: comment, postId, handleCommentDelete, updateComment }) => {
//   const { currentUser } = Blog();
//   const [drop, setDrop] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editComment, setEditComment] = useState("");
//   const [showReplyPopup, setShowReplyPopup] = useState(false);
//   const [newReply, setNewReply] = useState("");  // New reply content
//   const [emojis, setEmojis] = useState([
//     "😊", "😂", "😍", "😎", "😭", "😢", "😡", "🥺", "😜"
//   ]);  // Predefined emojis

//   const { userId, content: commentText = "", createdAt, username, userImg } = comment;

//   // Format the timestamp with moment
//   const formattedTimestamp = moment(createdAt).fromNow();

//   const removeComment = async () => {
//     try {
//       await axiosInstance.delete(`/posts/${postId}/comments/${comment._id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//       });

//       toast.success("Comment has been removed");
//       handleCommentDelete(comment._id);
//       setDrop(false);
//     } catch (error) {
//       console.error("Error deleting comment:", error.response?.data || error.message);
//       toast.error("Failed to delete comment.");
//     }
//   };

//   const editCommentText = () => {
//     setIsEdit(true);
//     setDrop(false);
//     setEditComment(commentText);
//   };

//   const handleEdit = async () => {
//     if (!editComment.trim()) {
//       toast.error("Comment cannot be empty.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axiosInstance.put(
//         `/posts/${postId}/comments/${comment._id}`,
//         { content: editComment },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );

//       if (response.status === 200) {
//         toast.success("Comment updated successfully");
//         updateComment(comment._id, editComment);
//         setIsEdit(false);
//       }
//     } catch (error) {
//       console.error("Error updating comment:", error.response?.data || error.message);
//       toast.error("Failed to update comment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReplyClick = () => {
//     setShowReplyPopup(true);
//   };

//   const handleEmojiClick = (emoji) => {
//     setNewReply((prevReply) => prevReply + emoji);
//   };

//   const handleReplySubmit = async () => {
//     if (!newReply.trim()) return;

//     try {
//       const response = await axiosInstance.post(
//         `/posts/${postId}/comments`,
//         { userId: currentUser.id, content: newReply, parentCommentId: comment._id },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );

//       toast.success("Reply added successfully");
//       setNewReply("");  // Reset the reply input
//       setShowReplyPopup(false);  // Close the reply popup
//     } catch (error) {
//       console.error("Error adding reply:", error);
//       toast.error("Failed to add reply.");
//     }
//   };

//   return (
//     <section className="border-b p-3">
//       {!isEdit ? (
//         <>
//           <div className="flex items-center gap-5">
//             <img
//               className="w-[2rem] h-[2rem] object-cover rounded-full"
//               src={userImg || "/profile.jpg"}
//               alt="user-img"
//             />
//             <div className="flex-1 flex justify-between">
//               <div>
//                 <h2 className="text-sm capitalize">{username || "Anonymous"}</h2>
//                 <p className="text-sm text-gray-400">{formattedTimestamp}</p>
//               </div>
//               {currentUser?.id === userId && (
//                 <div className="relative">
//                   <button
//                     onClick={() => setDrop(!drop)}
//                     className="text-2xl hover:opacity-70"
//                   >
//                     <BiDotsHorizontalRounded />
//                   </button>
//                   <DropDown showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
//                     <button
//                       onClick={editCommentText}
//                       className="hover:bg-gray-200 px-2 py-1 text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={removeComment}
//                       className="hover:bg-gray-200 px-2 py-1 text-sm"
//                     >
//                       Delete
//                     </button>
//                   </DropDown>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-2">
//             <p className="text-sm">{commentText}</p>
//             <BiReply
//               className="text-xl cursor-pointer hover:text-blue-500"
//               title="Reply"
//               onClick={handleReplyClick}
//             />
//           </div>
//         </>
//       ) : (
//         <div className="flex items-center gap-5">
//           <textarea
//             className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
//             value={editComment}
//             onChange={(e) => setEditComment(e.target.value)}
//             rows={3}
//           />
//           <button
//             onClick={handleEdit}
//             className="btn !bg-blue-500 !text-white mt-2"
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       )}

//       {showReplyPopup && (
//         <div className="mt-4 p-3 border-t">
//           <textarea
//             className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
//             value={newReply}
//             onChange={(e) => setNewReply(e.target.value)}
//             rows={3}
//             placeholder="Write a reply..."
//           />
//           <div className="flex flex-wrap mt-2">
//             {emojis.map((emoji, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => handleEmojiClick(emoji)}
//                 className="text-2xl mr-2 mb-2"
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={handleReplySubmit}
//             className="btn !bg-blue-500 !text-white mt-2 w-full py-2 rounded-lg"
//           >
//             Reply
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Comment;
// import React, { useState } from "react";
// import axiosInstance from "../../../axiosInstance";
// import { Blog } from "../../../Context/Context";
// import moment from "moment";
// import { BiDotsHorizontalRounded, BiReply } from "react-icons/bi";
// import DropDown from "../../../utils/DropDown";
// import { toast } from "react-toastify";

// const Comment = ({ item: comment, postId, handleCommentDelete, updateComment }) => {
//   const { currentUser } = Blog();
//   const [drop, setDrop] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editComment, setEditComment] = useState("");
//   const [showReplyPopup, setShowReplyPopup] = useState(false);
//   const [newReply, setNewReply] = useState("");  // New reply content
//   const [emojis, setEmojis] = useState([
//     "😊", "😂", "😍", "😎", "😭", "😢", "😡", "🥺", "😜"
//   ]);  // Predefined emojis
//   const [editReply, setEditReply] = useState("");  // Edit reply content
//   const [isReplyEdit, setIsReplyEdit] = useState(false);  // Track if a reply is being edited

//   const { userId, content: commentText = "", createdAt, username, userImg, replies = [] } = comment;

//   // Format the timestamp with moment
//   const formattedTimestamp = moment(createdAt).fromNow();

//   const removeComment = async () => {
//     try {
//       await axiosInstance.delete(`/posts/${postId}/comments/${comment._id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//       });

//       toast.success("Comment has been removed");
//       handleCommentDelete(comment._id);
//       setDrop(false);
//     } catch (error) {
//       console.error("Error deleting comment:", error.response?.data || error.message);
//       toast.error("Failed to delete comment.");
//     }
//   };

//   const editCommentText = () => {
//     setIsEdit(true);
//     setDrop(false);
//     setEditComment(commentText);
//   };

//   const handleEdit = async () => {
//     if (!editComment.trim()) {
//       toast.error("Comment cannot be empty.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axiosInstance.put(
//         `/posts/${postId}/comments/${comment._id}`,
//         { content: editComment },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );

//       if (response.status === 200) {
//         toast.success("Comment updated successfully");
//         updateComment(comment._id, editComment);
//         setIsEdit(false);
//       }
//     } catch (error) {
//       console.error("Error updating comment:", error.response?.data || error.message);
//       toast.error("Failed to update comment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReplyClick = () => {
//     setShowReplyPopup(true);
//   };

//   const handleEmojiClick = (emoji) => {
//     setNewReply((prevReply) => prevReply + emoji);
//   };

//   const handleReplySubmit = async () => {
//     if (!newReply.trim()) return;

//     try {
//       const response = await axiosInstance.post(
//         `/posts/${postId}/comments`,
//         { userId: currentUser.id, content: newReply, parentCommentId: comment._id },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );

//       toast.success("Reply added successfully");
//       setNewReply("");  // Reset the reply input
//       setShowReplyPopup(false);  // Close the reply popup
//     } catch (error) {
//       console.error("Error adding reply:", error);
//       toast.error("Failed to add reply.");
//     }
//   };

//   const handleCancelReply = () => {
//     setNewReply("");  // Clear the reply input
//     setShowReplyPopup(false);  // Close the reply popup
//   };

//   const handleEditReply = (replyId, content) => {
//     setIsReplyEdit(true);
//     setEditReply(content);
//   };

//   const handleUpdateReply = async (replyId) => {
//     if (!editReply.trim()) {
//       toast.error("Reply cannot be empty.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.put(
//         `/posts/${postId}/comments/${replyId}`,
//         { content: editReply },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );

//       toast.success("Reply updated successfully");
//       setIsReplyEdit(false);
//       setEditReply("");
//       // Update the UI by modifying the reply content
//     } catch (error) {
//       console.error("Error updating reply:", error.response?.data || error.message);
//       toast.error("Failed to update reply.");
//     }
//   };

//   const handleCancelEditReply = () => {
//     setIsReplyEdit(false);
//     setEditReply("");
//   };

//   return (
//     <section className="border-b p-3">
//       {!isEdit ? (
//         <>
//           <div className="flex items-center gap-5">
//             <img
//               className="w-[2rem] h-[2rem] object-cover rounded-full"
//               src={userImg || "/profile.jpg"}
//               alt="user-img"
//             />
//             <div className="flex-1 flex justify-between">
//               <div>
//                 <h2 className="text-sm capitalize">{username || "Anonymous"}</h2>
//                 <p className="text-sm text-gray-400">{formattedTimestamp}</p>
//               </div>
//               {currentUser?.id === userId && (
//                 <div className="relative">
//                   <button
//                     onClick={() => setDrop(!drop)}
//                     className="text-2xl hover:opacity-70"
//                   >
//                     <BiDotsHorizontalRounded />
//                   </button>
//                   <DropDown showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
//                     <button
//                       onClick={editCommentText}
//                       className="hover:bg-gray-200 px-2 py-1 text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={removeComment}
//                       className="hover:bg-gray-200 px-2 py-1 text-sm"
//                     >
//                       Delete
//                     </button>
//                   </DropDown>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-2">
//             <p className="text-sm">{commentText}</p>
//             <BiReply
//               className="text-xl cursor-pointer hover:text-blue-500"
//               title="Reply"
//               onClick={handleReplyClick}
//             />
//           </div>
//         </>
//       ) : (
//         <div className="flex items-center gap-5">
//           <textarea
//             className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
//             value={editComment}
//             onChange={(e) => setEditComment(e.target.value)}
//             rows={3}
//           />
//           <button
//             onClick={handleEdit}
//             className="btn !bg-blue-500 !text-white mt-2"
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       )}

//       {showReplyPopup && (
//         <div className="mt-4 p-3 border-t">
//           <textarea
//             className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
//             value={newReply}
//             onChange={(e) => setNewReply(e.target.value)}
//             rows={3}
//             placeholder="Write a reply..."
//           />
//           <div className="flex flex-wrap mt-2">
//             {emojis.map((emoji, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => handleEmojiClick(emoji)}
//                 className="text-2xl mr-2 mb-2"
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//           <div className="flex justify-between mt-2">
//             <button
//               onClick={handleReplySubmit}
//               className="btn !bg-blue-500 !text-white py-2 rounded-lg"
//             >
//               Reply
//             </button>
//             <button
//               onClick={handleCancelReply}
//               className="btn !bg-gray-500 !text-white py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Display Replies */}
//       {replies.length > 0 && (
//         <div className="mt-4 pl-5">
//           {replies.map((reply) => (
//             <div key={reply._id} className="border-b p-3">
//               <div className="flex items-center gap-5">
//                 <img
//                   className="w-[2rem] h-[2rem] object-cover rounded-full"
//                   src={reply.userImg || "/profile.jpg"}
//                   alt="user-img"
//                 />
//                 <div className="flex-1">
//                   <h2 className="text-sm capitalize">{reply.username}</h2>
//                   <p className="text-sm text-gray-400">{moment(reply.createdAt).fromNow()}</p>
//                 </div>
//                 {currentUser?.id === reply.userId && (
//                   <div className="relative">
//                     <button
//                       onClick={() => handleEditReply(reply._id, reply.content)}
//                       className="text-2xl hover:opacity-70"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => removeComment(reply._id)}
//                       className="text-2xl hover:opacity-70"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//               {!isReplyEdit ? (
//                 <p className="mt-2 text-sm">{reply.content}</p>
//               ) : (
//                 <div className="flex items-center gap-5">
//                   <textarea
//                     className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
//                     value={editReply}
//                     onChange={(e) => setEditReply(e.target.value)}
//                     rows={3}
//                   />
//                   <button
//                     onClick={() => handleUpdateReply(reply._id)}
//                     className="btn !bg-blue-500 !text-white mt-2"
//                   >
//                     {loading ? "Updating..." : "Update"}
//                   </button>
//                   <button
//                     onClick={handleCancelEditReply}
//                     className="btn !bg-gray-500 !text-white mt-2"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Comment;
import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Blog } from "../../../Context/Context";
import moment from "moment";
import { BiDotsHorizontalRounded, BiReply } from "react-icons/bi";
import DropDown from "../../../utils/DropDown";
import { toast } from "react-toastify";

const Comment = ({ item: comment, postId, handleCommentDelete, updateComment }) => {
  const { currentUser } = Blog();
  const [dropComment, setDropComment] = useState(false);  // Dropdown for comment
  const [dropReply, setDropReply] = useState(false);  // Dropdown for reply
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [newReply, setNewReply] = useState("");  // New reply content
  const [isReplyEdit, setIsReplyEdit] = useState(false);  // Track if a reply is being edited
  const [editReply, setEditReply] = useState("");  // Edit reply content
  const [emojis, setEmojis] = useState([
    "😊", "😂", "😍", "😎", "😭", "😢", "😡", "🥺", "😜"
  ]);  // Predefined emojis

  const { userId, content: commentText = "", createdAt, username, userImg, replies = [] } = comment;

  // Format the timestamp with moment
  const formattedTimestamp = moment(createdAt).fromNow();

  const removeComment = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      toast.success("Comment has been removed");
      handleCommentDelete(comment._id);  // Update UI immediately
      setDropComment(false);
    } catch (error) {
      console.error("Error deleting comment:", error.response?.data || error.message);
      toast.error("Failed to delete comment.");
    }
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDropComment(false);
    setEditComment(commentText);
  };

  const handleEdit = async () => {
    if (!editComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/posts/${postId}/comments/${comment._id}`,
        { content: editComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
  
      if (response.status === 200) {
        toast.success("Comment updated successfully");
  
        // Immediately update the comment in the parent state (or local state)
        const updatedComment = { ...comment, content: editComment };
        
        // Call the update function passed as a prop to update the UI
        updateComment(updatedComment);  // Update the state with the edited comment
  
        // Reset the edit state
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error updating comment:", error.response?.data || error.message);
      toast.error("Failed to update comment.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleReplyClick = () => {
    setShowReplyPopup(true);
  };

  const handleEmojiClick = (emoji) => {
    setNewReply((prevReply) => prevReply + emoji);
  };

  const handleReplySubmit = async () => {
    if (!newReply.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/posts/${postId}/comments`,
        { userId: currentUser.id, content: newReply, parentCommentId: comment._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );

      toast.success("Reply added successfully");
      setNewReply("");  // Reset the reply input
      setShowReplyPopup(false);  // Close the reply popup
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply.");
    }
  };

  const handleCancelReply = () => {
    setNewReply("");  // Clear the reply input
    setShowReplyPopup(false);  // Close the reply popup
  };

  const handleEditReply = (replyId, content) => {
    setIsReplyEdit(true);
    setEditReply(content);
  };

  const handleUpdateReply = async (replyId) => {
  if (!editReply.trim()) {
    toast.error("Reply cannot be empty.");
    return;
  }

  try {
    const response = await axiosInstance.put(
      `/posts/${postId}/comments/${replyId}`,
      { content: editReply },
      { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
    );

    toast.success("Reply updated successfully");

    setIsReplyEdit(false);
    setEditReply("");

    // Update the reply in the parent component's state immediately
    const updatedReplies = replies.map((reply) => 
      reply._id === replyId ? { ...reply, content: editReply } : reply
    );
    setReplies(updatedReplies);  // Ensure the UI updates immediately
  } catch (error) {
    console.error("Error updating reply:", error.response?.data || error.message);
    toast.error("Failed to update reply.");
  }
};

  
  const handleCancelEditReply = () => {
    setIsReplyEdit(false);
    setEditReply("");
  };

  return (
    <section className="border-b p-3">
      {!isEdit ? (
        <>
          <div className="flex items-center gap-5">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={userImg || "/profile.jpg"}
              alt="user-img"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm capitalize">{username || "Anonymous"}</h2>
                <p className="text-sm text-gray-400">{formattedTimestamp}</p>
              </div>
              {currentUser?.id === userId && (
                <div className="relative">
                  <button
                    onClick={() => setDropComment(!dropComment)}
                    className="text-2xl hover:opacity-70"
                  >
                    <BiDotsHorizontalRounded />
                  </button>
                  <DropDown showDrop={dropComment} setShowDrop={setDropComment} size="w-[10rem]">
                    <button
                      onClick={editCommentText}
                      className="hover:bg-gray-200 px-2 py-1 text-sm flex items-center gap-2"
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={removeComment}
                      className="hover:bg-gray-200 px-2 py-1 text-sm flex items-center gap-2"
                    >
                      <span>Delete</span>
                    </button>
                  </DropDown>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm">{commentText}</p>
            <BiReply
              className="text-xl cursor-pointer hover:text-blue-500"
              title="Reply"
              onClick={handleReplyClick}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-5">
          <textarea
            className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            rows={3}
          />
          <button
            onClick={handleEdit}
            className="btn !bg-blue-500 !text-white mt-2"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      )}

      {showReplyPopup && (
        <div className="mt-4 p-3 border-t">
          <textarea
            className="w-full p-3 border rounded-lg shadow-sm text-gray-700"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            rows={3}
            placeholder="Write a reply..."
          />
          <div className="flex flex-wrap mt-2">
            {emojis.map((emoji, index) => (
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
          <div className="flex justify-between mt-2">
            <button
              onClick={handleReplySubmit}
              className="btn !bg-blue-500 !text-white"
            >
              Reply
            </button>
            <button
              onClick={handleCancelReply}
              className="btn !bg-gray-500 !text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {replies.map((reply) => (
        <div key={reply._id} className="mt-4 pl-5 border-l">
          <div className="flex items-center gap-5">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={reply.userImg || "/profile.jpg"}
              alt="user-img"
            />
            <div className="flex-1">
              <h2 className="text-sm">{reply.username || "Anonymous"}</h2>
              <p className="text-sm text-gray-400">{moment(reply.createdAt).fromNow()}</p>
              <p className="mt-2">{reply.content}</p>
            </div>
            {currentUser?.id === reply.userId && (
              <div className="relative">
                <button
                  onClick={() => setDropReply(!dropReply)}
                  className="text-2xl hover:opacity-70"
                >
                  <BiDotsHorizontalRounded />
                </button>
                <DropDown showDrop={dropReply} setShowDrop={setDropReply} size="w-[10rem]">
                  <button
                    onClick={() => handleEditReply(reply._id, reply.content)}
                    className="hover:bg-gray-200 px-2 py-1 text-sm flex items-center gap-2"
                  >
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteReply(reply._id)}
                    className="hover:bg-gray-200 px-2 py-1 text-sm flex items-center gap-2"
                  >
                    <span>Delete</span>
                  </button>
                </DropDown>
              </div>
            )}
          </div>

          {isReplyEdit && editReply === reply.content && (
            <div>
              <textarea
                className="w-full p-3 mt-2 border rounded-lg"
                value={editReply}
                onChange={(e) => setEditReply(e.target.value)}
                rows={2}
              />
              <button
                onClick={() => handleUpdateReply(reply._id)}
                className="btn !bg-blue-500 !text-white mt-2"
              >
                Update Reply
              </button>
              <button
                onClick={handleCancelEditReply}
                className="btn !bg-gray-500 !text-white mt-2 ml-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Comment;
