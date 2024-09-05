// import React, { useState, useEffect } from "react";
// import FollowBtn from "./FollowBtn";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../../axiosInstance"; // Adjust the import path as necessary

// const Follow = () => {
//   const [users, setUsers] = useState([]);
//   const [count, setCount] = useState(5);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   // Fetch current user and users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Retrieve token from localStorage
//         const token = localStorage.getItem('authToken');

//         // Set token in axios headers
//         if (token) {
//           axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         }

//         // Fetch current user
//         const currentUserResponse = await axiosInstance.get('/auth/me');
//         setCurrentUser(currentUserResponse.data);

//         // Fetch all users
//         const usersResponse = await axiosInstance.get('/profile/');
//         setUsers(usersResponse.data);

//         console.log("Fetched users:", usersResponse.data); // Check console for fetched users
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Filter users excluding current user
//   const filteredUsers = users
//     .slice(0, count)
//     .filter((user) => user.id !== currentUser?.id) || []; // Ensure it's an empty array if null

//   return (
//     <>
//       {filteredUsers.length > 0 ? (
//         filteredUsers.map((user, i) => {
//           const { username, bio, userImg, id } = user; // Note the change from userId to id
//           return (
//             <div key={i} className="flex items-start gap-2 my-4">
//               <div
//                 onClick={() => navigate(`/profile/${id}`)} // Use id here
//                 className="flex-1 flex items-center gap-2 cursor-pointer"
//               >
//                 <img
//                   className="w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full"
//                   src={userImg}
//                   alt="userImg"
//                 />
//                 <div className="flex flex-col gap-1">
//                   <h2 className="font-bold capitalize">{username}</h2>
//                   <span className="leading-4 text-gray-500 text-sm line-clamp-2">
//                     {bio || "This user has no bio"}
//                   </span>
//                 </div>
//               </div>
//               <FollowBtn userId={id} /> {/* Use id here */}
//             </div>
//           );
//         })
//       ) : (
//         <p>No users to display</p>
//       )}
//       {users.length > count && (
//         <button
//           onClick={() => setCount((prev) => prev + 3)}
//           className="mb-3 text-green-900 text-sm hover:underline"
//         >
//           Load more users
//         </button>
//       )}
//     </>
//   );
// };

// export default Follow;
import React, { useState, useEffect } from "react";
import FollowBtn from "./FollowBtn";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance"; // Adjust the import path as necessary

const Follow = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(5);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Fetch current user and users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('authToken');

        // Set token in axios headers
        if (token) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Fetch current user
        const currentUserResponse = await axiosInstance.get('/auth/me');
        setCurrentUser(currentUserResponse.data);

        // Fetch all users
        const usersResponse = await axiosInstance.get('/profile/');
        setUsers(usersResponse.data);

        console.log("Fetched users:", usersResponse.data); // Check console for fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users excluding current user
  const filteredUsers = users
    .slice(0, count)
    .filter((user) => user.id !== currentUser?.id) || []; // Ensure it's an empty array if null

  // Handle profile navigation
  const handleProfileClick = (id) => {
    console.log("Navigating to profile with ID:", id); // Debugging log
    navigate(`/profile/${id}`);
  };

  return (
    <>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, i) => {
          const { username, bio, userImg, id } = user; // Note the change from userId to id
          return (
            <div key={i} className="flex items-start gap-2 my-4">
              <div
                onClick={() => handleProfileClick(id)} // Ensure id is the correct user ID
                className="flex-1 flex items-center gap-2 cursor-pointer"
              >
                <img
                  className="w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full"
                  src={userImg}
                  alt="userImg"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold capitalize">{username}</h2>
                  <span className="leading-4 text-gray-500 text-sm line-clamp-2">
                    {bio || "This user has no bio"}
                  </span>
                </div>
              </div>
              <FollowBtn userId={id} /> {/* Use id here */}
            </div>
          );
        })
      ) : (
        <p>No users to display</p>
      )}
      {users.length > count && (
        <button
          onClick={() => setCount((prev) => prev + 3)}
          className="mb-3 text-green-900 text-sm hover:underline"
        >
          Load more users
        </button>
      )}
    </>
  );
};

export default Follow;
