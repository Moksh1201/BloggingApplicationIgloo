// import React, { useState, useEffect } from "react";
// import ProfileHome from "./Activities/ProfileHome";
// import ProfileLists from "./Activities/ProfileLists";
// import ProfileAbout from "./Activities/ProfileAbout";
// import Modal from "../../../utils/Modal";
// import { LiaTimesSolid } from "react-icons/lia";
// import { IoSettingsSharp } from "react-icons/io5";
// import { discoverActions } from "../../../data";
// import EditProfile from "./EditProfile";
// import { Blog } from "../../../Context/Context"; // Corrected import for BlogContext
// import { useParams } from "react-router-dom";
// import useSingleFetch from "../../hooks/useSingleFetch";

// const Profile = () => {
//   const { allUsers, currentUser } = Blog();
//   const { userId } = useParams();
//   const activities = [
//     {
//       title: "Home",
//       comp: ProfileHome,
//     },
//     {
//       title: "Lists",
//       comp: ProfileLists,
//     },
//     {
//       title: "About",
//       comp: ProfileAbout,
//     },
//   ];
//   const [currentActive, setCurrentActive] = useState(activities[0]);
//   const [modal, setModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);

//   // Find user data from allUsers array
//   const getUserData = allUsers.find((user) => user.userId === userId);

//   // Fetch follows and followers data
//   const { data: follows = [] } = useSingleFetch("users", userId, "follows");
//   const { data: followers = [] } = useSingleFetch("users", userId, "followers");

//   useEffect(() => {
//     // Handle side effects if needed when userId changes
//   }, [userId]);

//   return (
//     <section className="size flex gap-[4rem] relative">
//       {/* User activities */}
//       <div className="mt-[9rem] flex-[2]">
//         <div className="flex items-end gap-4">
//           <h2 className="text-3xl sm:text-5xl font-bold capitalize">
//             {getUserData?.username || "User not found"}
//           </h2>
//           <p className="text-gray-500 text-xs sm:text-sm">
//             Followers({followers.length})
//           </p>
//           <p className="text-gray-500 text-xs sm:text-sm">
//             Followings({follows.length})
//           </p>
//         </div>
//         <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
//           {activities.map((item, i) => (
//             <div
//               key={i}
//               className={`py-[0.5rem] ${
//                 item.title === currentActive.title
//                   ? "border-b border-gray-500"
//                   : ""
//               }`}
//             >
//               <button onClick={() => setCurrentActive(item)}>
//                 {item.title}
//               </button>
//             </div>
//           ))}
//         </div>
//         <currentActive.comp
//           getUserData={getUserData}
//           setEditModal={setEditModal}
//         />
//       </div>
//       {/* Button to open the sidebar */}
//       <button
//         onClick={() => setModal(true)}
//         className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
//       >
//         <IoSettingsSharp />
//       </button>
//       {/* User details */}
//       <Modal modal={modal} setModal={setModal}>
//         <div
//           className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:sticky ${
//             modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"
//           } transition-all duration-500`}
//         >
//           {/* Icons to close out modal */}
//           <div className="pb-4 text-right">
//             <button onClick={() => setModal(false)} className="inline-block md:hidden">
//               <LiaTimesSolid />
//             </button>
//           </div>
//           {/* Profile details */}
//           <div className="sticky top-7 flex flex-col justify-between">
//             <img
//               className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
//               src={getUserData?.userImg || "/profile.jpg"}
//               alt="profile-img"
//             />
//             <h2 className="py-2 font-bold capitalize">
//               {getUserData?.username || "User not found"}
//             </h2>
//             <p className="text-gray-500 first-letter:uppercase text-sm">
//               {getUserData?.bio || "No bio available"}
//             </p>
//             {currentUser?.userId === getUserData?.userId && (
//               <button
//                 onClick={() => setEditModal(true)}
//                 className="text-green-700 pt-6 text-sm w-fit"
//               >
//                 Edit Profile
//               </button>
//             )}
//             {/* Nav */}
//             <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
//               {discoverActions.map((item) => (
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
//           getUserData={getUserData}
//           editModal={editModal}
//           setEditModal={setEditModal}
//         />
//       )}
//     </section>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from '../../../axiosInstance';
import { Blog } from '../../../Context/Context'; 
import ProfileHome from "./Activities/ProfileHome";
import ProfileLists from "./Activities/ProfileLists";
import ProfileAbout from "./Activities/ProfileAbout";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { currentUser } = Blog();
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentActive, setCurrentActive] = useState({ title: "Home", comp: ProfileHome });
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const activities = [
    { title: "Home", comp: ProfileHome },
    { title: "Lists", comp: ProfileLists },
    { title: "About", comp: ProfileAbout },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const token = localStorage.getItem('authToken'); 
          const response = await axiosInstance.get(`/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="size flex gap-[4rem] relative">
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
            {profileData?.username || "User not found"}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Followers({profileData?.followers?.length || 0})
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Followings({profileData?.following?.length || 0})
          </p>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
          {activities.map((item, i) => (
            <div
              key={i}
              className={`py-[0.5rem] ${
                item.title === currentActive.title
                  ? "border-b border-gray-500"
                  : ""
              }`}
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
      <button
        onClick={() => setModal(true)}
        className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
      >
        <IoSettingsSharp />
      </button>
      <Modal modal={modal} setModal={setModal}>
        <div
          className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:sticky ${
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
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}
    </section>
  );
};

export default Profile;
