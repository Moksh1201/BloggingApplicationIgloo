
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../../axiosInstance";
// import { Blog } from "../../../Context/Context";
// import ProfileHome from "./Activities/ProfileHome";
// import ProfileLists from "./Activities/ProfileLists";
// import ProfileAbout from "./Activities/ProfileAbout";
// import Modal from "../../../utils/Modal";
// import { LiaTimesSolid } from "react-icons/lia";
// import { IoSettingsSharp } from "react-icons/io5";
// import EditProfile from "./EditProfile";
// import CompactProfileModal from "./CompactProfileModal";

// const Profile = () => {
//   const { currentUser } = Blog();
//   const { userId } = useParams();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentActive, setCurrentActive] = useState({ title: "Home", comp: ProfileHome });
//   const [modal, setModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [compactModal, setCompactModal] = useState(false);
//   const [followersData, setFollowersData] = useState([]);
//   const [followingData, setFollowingData] = useState([]);
//   const [modalType, setModalType] = useState("");

//   const activities = [
//     { title: "Home", comp: ProfileHome },
//     { title: "Lists", comp: ProfileLists },
//     { title: "About", comp: ProfileAbout },
//   ];

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (userId) {
//         try {
//           const token = localStorage.getItem("authToken");
//           const response = await axiosInstance.get(`/auth/me`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const profileData = response.data;
//           setProfileData(profileData);
  
//           // Fetch details for followers and following
//           if (profileData.followers?.length) {
//             const followersResponse = await axiosInstance.post(
//               "/profile/batch-users",
//               { userIds: profileData.followers },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setFollowersData(followersResponse.data);
//           }
  
//           if (profileData.following?.length) {
//             const followingResponse = await axiosInstance.post(
//               "/profile/batch-users",
//               { userIds: profileData.following },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setFollowingData(followingResponse.data);
//           }
//         } catch (error) {
//           console.error("Error fetching profile data: ", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
  
//     fetchProfile();
//   }, [userId, currentUser?.userId]);
//   // Depend on both userId and currentUser to handle updates

//   const handleViewProfile = (userId) => {
//     console.log("View Profile clicked for user:", userId);
//   };

//   const handleProfileUpdate = (updatedData) => {
//     console.log("Profile updated:", updatedData);
//     setProfileData(updatedData); 
//   };

//   const handleRemove = (userId) => {
//     console.log("Remove clicked for user:", userId);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <section className="size flex gap-[4rem] relative">
//       <div className="mt-[9rem] flex-[2]">
//         <div className="flex items-center gap-4">
//           <h2 className="text-3xl sm:text-5xl font-bold capitalize">
//             {profileData?.username || "User not found"}
//           </h2>
//           <div className="flex items-center gap-4 text-sm sm:text-md">
//             <button
//               onClick={() => { setModalType("followers"); setCompactModal(true); }}
//               className="text-blue-500 hover:text-blue-700 transition duration-300"
//             >
//               Followers ({profileData?.followers?.length || 0})
//             </button>
//             <button
//               onClick={() => { setModalType("following"); setCompactModal(true); }}
//               className="text-blue-500 hover:text-blue-700 transition duration-300"
//             >
//               Following ({profileData?.following?.length || 0})
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
//           {activities.map((item, i) => (
//             <div
//               key={i}
//               className={`py-[0.5rem] ${item.title === currentActive.title ? "border-b border-gray-500" : ""}`}
//             >
//               <button onClick={() => setCurrentActive(item)}>
//                 {item.title}
//               </button>
//             </div>
//           ))}
//         </div>

//         <currentActive.comp
//           profileData={profileData}
//           setEditModal={setEditModal}
//         />
//       </div>

//       {compactModal && (
//     <CompactProfileModal
//       users={modalType === "followers" ? followersData : followingData}
//       onClose={() => setCompactModal(false)}
//       onRemove={handleRemove}
//       onViewProfile={handleViewProfile}
//       modalType={modalType}
//     />
//   )}


//       <button
//         onClick={() => setModal(true)}
//         className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
//       >
//         <IoSettingsSharp />
//       </button>

//       <Modal modal={modal} setModal={setModal}>
//         <div
//           className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed right-0 top-[5rem] w-[18rem] bg-white md:sticky ${
//             modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"
//           } transition-all duration-500`}
//         >
//           <div className="pb-4 text-right">
//             <button onClick={() => setModal(false)} className="inline-block md:hidden">
//               <LiaTimesSolid />
//             </button>
//           </div>

//           <div className="sticky top-7 flex flex-col justify-between">
//             <img
//               className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
//               src={profileData?.userImg || "/profile.jpg"}
//               alt="profile-img"
//             />
//             <h2 className="py-2 font-bold capitalize">
//               {profileData?.username || "User not found"}
//             </h2>
//             <p className="text-gray-500 first-letter:uppercase text-sm">
//               {profileData?.bio || "No bio available"}
//             </p>
//             {currentUser?.userId === profileData?.id && (
//               <button
//                 onClick={() => setEditModal(true)}
//                 className="text-green-700 pt-6 text-sm w-fit"
//               >
//                 Edit Profile
//               </button>
//             )}
//             <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
//               {["Action 1", "Action 2", "Action 3"].map((item) => (
//                 <button key={item} className="text-xs text-black1">
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Modal>

//       {editModal && (
//         <EditProfile
//           profileData={profileData}
//           currentUserId={currentUser?.userId}
//           editModal={editModal}
//           setEditModal={setEditModal}
//           handleProfileUpdate={handleProfileUpdate}
//         />
//       )}
//     </section>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { Blog } from "../../../Context/Context";
import ProfileHome from "./Activities/ProfileHome";
import ProfileLists from "./Activities/ProfileLists";
import ProfileAbout from "./Activities/ProfileAbout";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";
import EditProfile from "./EditProfile";
import CompactProfileModal from "./CompactProfileModal";

const Profile = () => {
  const { currentUser } = Blog();
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentActive, setCurrentActive] = useState({ title: "Home", comp: ProfileHome });
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [compactModal, setCompactModal] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [modalType, setModalType] = useState("");

  const activities = [
    { title: "Home", comp: ProfileHome },
    { title: "Lists", comp: ProfileLists },
    { title: "About", comp: ProfileAbout },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await axiosInstance.get(`/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const profileData = response.data;
          setProfileData(profileData);
  
          // Fetch details for followers and following
          if (profileData.followers?.length) {
            const followersResponse = await axiosInstance.post(
              "/profile/batch-users",
              { userIds: profileData.followers },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setFollowersData(followersResponse.data);
          }
  
          if (profileData.following?.length) {
            const followingResponse = await axiosInstance.post(
              "/profile/batch-users",
              { userIds: profileData.following },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setFollowingData(followingResponse.data);
          }
        } catch (error) {
          console.error("Error fetching profile data: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchProfile();
  }, [userId, currentUser?.userId]);
  // Depend on both userId and currentUser to handle updates

  const handleViewProfile = (userId) => {
    console.log("View Profile clicked for user:", userId);
  };

  const handleProfileUpdate = (updatedData) => {
    console.log("Profile updated:", updatedData);
    setProfileData(updatedData); 
  };

  const handleRemove = (userId) => {
    console.log("Remove clicked for user:", userId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="size flex gap-[4rem] relative">
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
            {profileData?.username || "User not found"}
          </h2>
          <div className="flex items-center gap-4 text-sm sm:text-md">
            <button
              onClick={() => { setModalType("followers"); setCompactModal(true); }}
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Followers ({profileData?.followers?.length || 0})
            </button>
            <button
              onClick={() => { setModalType("following"); setCompactModal(true); }}
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Following ({profileData?.following?.length || 0})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
          {activities.map((item, i) => (
            <div
              key={i}
              className={`py-[0.5rem] ${item.title === currentActive.title ? "border-b border-gray-500" : ""}`}
            >
              <button onClick={() => setCurrentActive(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>

        <currentActive.comp
          profileData={profileData}
          setEditModal={setEditModal}
        />
      </div>

      {compactModal && (
    <CompactProfileModal
      users={modalType === "followers" ? followersData : followingData}
      onClose={() => setCompactModal(false)}
      onRemove={handleRemove}
      onViewProfile={handleViewProfile}
      modalType={modalType}
    />
  )}


      <button
        onClick={() => setModal(true)}
        className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
      >
        <IoSettingsSharp />
      </button>

      <Modal modal={modal} setModal={setModal}>
        <div
          className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed right-0 top-[5rem] w-[18rem] bg-white md:sticky ${
            modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"
          } transition-all duration-500`}
        >
          <div className="pb-4 text-right">
            <button onClick={() => setModal(false)} className="inline-block md:hidden">
              <LiaTimesSolid />
            </button>
          </div>

          <div className="sticky top-7 flex flex-col justify-between">
            <img
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
              src={profileData?.userImg || "/profile.jpg"}
              alt="profile-img"
            />
            <h2 className="py-2 font-bold capitalize">
              {profileData?.username || "User not found"}
            </h2>
            <p className="text-gray-500 first-letter:uppercase text-sm">
              {profileData?.bio || "No bio available"}
            </p>
            {currentUser?.userId === profileData?.id && (
              <button
                onClick={() => setEditModal(true)}
                className="text-green-700 pt-6 text-sm w-fit"
              >
                Edit Profile
              </button>
            )}
            <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
              {["Action 1", "Action 2", "Action 3"].map((item) => (
                <button key={item} className="text-xs text-black1">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {editModal && (
        <EditProfile
          profileData={profileData}
          currentUserId={currentUser?.userId}
          editModal={editModal}
          setEditModal={setEditModal}
          handleProfileUpdate={handleProfileUpdate}
        />
      )}
    </section>
  );
};

export default Profile;
