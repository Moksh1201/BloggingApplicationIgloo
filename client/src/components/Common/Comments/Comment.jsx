// import React, { useState } from "react";
// import { Blog } from "../../../Context/Context";
// import moment from "moment";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import DropDown from "../../../utils/DropDown";
// import { toast } from "react-toastify";

// const Comment = ({ item: comment, postId, handleCommentDelete }) => {
//   const { allUsers, currentUser } = Blog();
//   const [drop, setDrop] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editComment, setEditComment] = useState("");

//   const { userId, content: commentText, created } = comment;
//   const getUserData = allUsers.find((user) => user.id === userId);

//   const removeComment = async () => {
//     try {
//       await fetch(`/api/posts/${postId}/comments/${comment.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Include token if authentication is used
//         }
//       });
//       setDrop(false);
//       toast.success("Comment has been removed");
//       handleCommentDelete(comment.id); // Call the parent handler to update the list
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const editCommentText = () => {
//     setIsEdit(true);
//     setDrop(false);
//     setEditComment(commentText || ""); // Default to empty string if commentText is undefined
//   };

//   const handleEdit = async () => {
//     setLoading(true);
//     try {
//       await fetch(`/api/posts/${postId}/comments/${comment.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Include token if authentication is used
//         },
//         body: JSON.stringify({
//           commentText: editComment,
//           created: Date.now(),
//           userId: currentUser?.id
//         })
//       });
//       setEditComment("");
//       setIsEdit(false);
//       setDrop(false);
//       toast.success("Comment has been updated");
//     } catch (error) {
//       toast.error(error.message);
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
//                       className="text-2xl hover:opacity-70">
//                       <BiDotsHorizontalRounded />
//                     </button>
//                     <DropDown
//                       showDrop={drop}
//                       setShowDrop={setDrop}
//                       size="w-[10rem]">
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
//                 setEditComment("");
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
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropDown from "../../../utils/DropDown";
import { toast } from "react-toastify";

const Comment = ({ item: comment, postId, handleCommentDelete, refreshComments }) => {
  const { allUsers, currentUser } = Blog();
  const [drop, setDrop] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editComment, setEditComment] = useState("");

  const { userId, content: commentText, created } = comment;
  const getUserData = allUsers.find((user) => user.id === userId);

  const removeComment = async () => {
    if (!comment._id) {
      console.error("Comment ID is missing.");
      toast.error("Comment ID is missing.");
      return;
    }

    try {
      console.log("Deleting comment with ID:", comment._id); // Debug log
      await fetch(`/api/posts/${postId}/comments/${comment._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setDrop(false);
      toast.success("Comment has been removed");
      handleCommentDelete(comment._id); // Notify parent to remove specific comment
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment.");
    }
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
    setEditComment(commentText || ""); // Default to empty string if commentText is undefined
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/posts/${postId}/comments/${comment._id}`, {
        content: editComment
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });

      if (response.status === 200) {
        setIsEdit(false);
        setEditComment(response.data.content);
        toast.success("Comment updated successfully");
        
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-b">
      {!isEdit ? (
        <>
          <div className="flex items-center gap-5">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={getUserData?.userImg || "/profile.jpg"}
              alt="user-img"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm capitalize">{getUserData?.username}</h2>
                <p className="text-sm text-gray-400">
                  {moment(created).fromNow()}
                </p>
              </div>
              <div className="relative">
                {currentUser && currentUser.id === userId && (
                  <>
                    <button
                      onClick={() => setDrop(!drop)}
                      className="text-2xl hover:opacity-70"
                    >
                      <BiDotsHorizontalRounded />
                    </button>
                    <DropDown
                      showDrop={drop}
                      setShowDrop={setDrop}
                      size="w-[10rem]"
                    >
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
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="text-sm mt-2">{commentText}</p>
        </>
      ) : (
        <div className="p-2">
          <textarea
            className="w-full p-2 border rounded"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
          <div className="flex items-center justify-end gap-4 mt-2">
            <button
              onClick={() => {
                setEditComment(commentText || ""); // Reset to original comment content
                setIsEdit(false);
              }}
              className="text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="btn !text-xs !bg-green-700 !text-white !rounded-full"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comment;
