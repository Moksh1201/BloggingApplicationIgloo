import React, { useState, useEffect } from "react";
import FollowBtn from "./FollowBtn";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance"; 

const Follow = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(5);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Fetch current user and users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
  
        const [currentUserResponse, usersResponse] = await Promise.all([
          axiosInstance.get('/auth/me'), // Fetch current user
          axiosInstance.get('/profile/'), // Fetch all users
        ]);
  
        setCurrentUser(currentUserResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  // Filter users excluding current user
  const filteredUsers = users
    .slice(0, count)
    .filter((user) => user.id !== currentUser?.id) || []; 

  const handleProfileClick = (id) => {
    console.log("Navigating to profile with ID:", id); 
    navigate(`/profile/${id}`);
  };

  return (
    <>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, i) => {
          const { username, bio, userImg, id } = user; 
          return (
            <div key={i} className="flex items-start gap-2 my-4">
              <div
                onClick={() => handleProfileClick(id)} 
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
