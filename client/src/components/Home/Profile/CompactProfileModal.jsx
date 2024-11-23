// import React from "react";

// const CompactProfileModal = ({ users, onClose, onRemove, onViewProfile, modalType }) => {
//   return (
//     <div className="fixed top-[10%] left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] z-20">
//       <div className="flex justify-between items-center">
//         <h3 className="font-bold text-lg capitalize">{modalType === "followers" ? "Followers" : "Following"}</h3>
//         <button
//           onClick={onClose}
//           className="text-xl text-gray-700 hover:text-gray-900 transition duration-200"
//         >
//           &times;
//         </button>
//       </div>

//       <div className="mt-4 space-y-4">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div key={user.id} className="flex items-center justify-between border-b pb-3">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={user.img || "/profile.jpg"}
//                   alt={user.username}
//                   className="w-10 h-10 object-cover rounded-full"
//                 />
//                 <span className="font-medium text-sm text-gray-700">{user.username}</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => onViewProfile(user.id)}
//                   className="text-blue-500 hover:text-blue-700 text-sm font-medium transition duration-200"
//                 >
//                   View Profile
//                 </button>
//                 <button
//                   onClick={() => onRemove(user.id)}
//                   className="text-red-500 hover:text-red-700 text-sm font-medium transition duration-200"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No {modalType === "followers" ? "followers" : "following"} found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompactProfileModal;
import React from "react";

const CompactProfileModal = ({ users, onClose, onRemove, onViewProfile, modalType }) => {
  return (
    <div className="fixed top-[10%] left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] z-20">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg capitalize">
          {modalType === "followers" ? "Followers" : "Following"}
        </h3>
        <button
          onClick={onClose}
          className="text-xl text-gray-700 hover:text-gray-900 transition duration-200"
        >
          &times;
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id || user._id} // Ensures compatibility with different ID formats
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.img || "/profile.jpg"} // Default profile image if none is provided
                  alt={user.username || "Unknown User"}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <span className="font-medium text-sm text-gray-700">
                  {user.username || "Unknown User"} {/* Fallback if username is missing */}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onViewProfile(user.id || user._id)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium transition duration-200"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onRemove(user.id || user._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No {modalType === "followers" ? "followers" : "following"} found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompactProfileModal;
