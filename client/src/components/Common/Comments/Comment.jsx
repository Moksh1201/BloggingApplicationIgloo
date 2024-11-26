// import React, { useState } from "react";
// import axiosInstance from "../../../axiosInstance";
// import { Blog } from "../../../Context/Context";
// import moment from "moment";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import DropDown from "../../../utils/DropDown";
// import { toast } from "react-toastify";

// const Comment = ({ item: comment, postId, handleCommentDelete, refreshComments, updateComment }) => {
//   const { allUsers, currentUser } = Blog();
//   const [drop, setDrop] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editComment, setEditComment] = useState("");

//   const { userId, content: commentText, created } = comment;
//   const getUserData = allUsers.find((user) => user.id === userId);

//   const removeComment = async () => {
//     if (!comment._id) {
//       console.error("Comment ID is missing.");
//       toast.error("Comment ID is missing.");
//       return;
//     }

//     try {
//       await axiosInstance.delete(`/posts/${postId}/comments/${comment._id}`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
//       });

//       setDrop(false);
//       toast.success("Comment has been removed");
//       handleCommentDelete(comment._id); // Update parent component
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       toast.error("Failed to delete comment.");
//     }
//   };

//   const editCommentText = () => {
//     setIsEdit(true);
//     setDrop(false);
//     setEditComment(commentText || ""); 
//   };

//   const handleEdit = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.put(`/posts/${postId}/comments/${comment._id}`, {
//         content: editComment
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
//       });

//       if (response.status === 200) {
//         setIsEdit(false);
//         toast.success("Comment updated successfully");
//         updateComment(comment._id, editComment); // Update local state with the new comment
//       }
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       toast.error("Failed to update comment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="border-b">
//       {!isEdit ? (
//         <>
//           <div className="flex items-center gap-5">
//             <img
//               className="w-[2rem] h-[2rem] object-cover rounded-full"
//               src={getUserData?.userImg || "/profile.jpg"}
//               alt="user-img"
//             />
//             <div className="flex-1 flex justify-between">
//               <div>
//                 <h2 className="text-sm capitalize">{getUserData?.username}</h2>
//                 <p className="text-sm text-gray-400">
//                   {moment(created).fromNow()}
//                 </p>
//               </div>
//               <div className="relative">
//                 {currentUser && currentUser.id === userId && (
//                   <>
//                     <button
//                       onClick={() => setDrop(!drop)}
//                       className="text-2xl hover:opacity-70"
//                     >
//                       <BiDotsHorizontalRounded />
//                     </button>
//                     <DropDown
//                       showDrop={drop}
//                       setShowDrop={setDrop}
//                       size="w-[10rem]"
//                     >
//                       <button
//                         onClick={editCommentText}
//                         className="hover:bg-gray-200 px-2 py-1 text-sm"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={removeComment}
//                         className="hover:bg-gray-200 px-2 py-1 text-sm"
//                       >
//                         Delete
//                       </button>
//                     </DropDown>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//           <p className="text-sm mt-2">{commentText}</p>
//         </>
//       ) : (
//         <div className="p-2">
//           <textarea
//             className="w-full p-2 border rounded"
//             value={editComment}
//             onChange={(e) => setEditComment(e.target.value)}
//           />
//           <div className="flex items-center justify-end gap-4 mt-2">
//             <button
//               onClick={() => {
//                 setEditComment(commentText || ""); // Reset to original comment content
//                 setIsEdit(false);
//               }}
//               className="text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleEdit}
//               className="btn !text-xs !bg-green-700 !text-white !rounded-full"
//             >
//               {loading ? "Updating..." : "Update"}
//             </button>
//           </div>
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
  const [drop, setDrop] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [showReplyPopup, setShowReplyPopup] = useState(false);

  const { userId, content: commentText = "", createdAt, username, userImg } = comment;

  // Format the timestamp with moment
  const formattedTimestamp = moment(createdAt).fromNow();

  const removeComment = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      toast.success("Comment has been removed");
      handleCommentDelete(comment._id);
      setDrop(false);
    } catch (error) {
      console.error("Error deleting comment:", error.response?.data || error.message);
      toast.error("Failed to delete comment.");
    }
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
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
        updateComment(comment._id, editComment);
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
                    onClick={() => setDrop(!drop)}
                    className="text-2xl hover:opacity-70"
                  >
                    <BiDotsHorizontalRounded />
                  </button>
                  <DropDown showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
                    <button
                      onClick={editCommentText}
                      className="hover:bg-gray-200 px-2 py-1 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={removeComment}
                      className="hover:bg-gray-200 px-2 py-1 text-sm"
                    >
                      Delete
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

          {showReplyPopup && (
            <div className="mt-4 p-2 border rounded bg-gray-100">
              <textarea
                placeholder="Write your reply here..."
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setShowReplyPopup(false)}
                  className="text-sm border py-1 px-2 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button className="text-sm bg-blue-500 text-white py-1 px-2 rounded hover:opacity-80">
                  Reply
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="p-2">
          <textarea
            className="w-full p-2 border rounded"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              onClick={() => setIsEdit(false)}
              className="text-sm border py-1 px-2 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="text-sm bg-blue-500 text-white py-1 px-2 rounded hover:opacity-80"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comment;
