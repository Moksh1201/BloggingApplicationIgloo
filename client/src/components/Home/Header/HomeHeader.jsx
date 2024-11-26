
// import React, { useState, useEffect } from "react";
// import { BsMedium } from "react-icons/bs";
// import { CiSearch } from "react-icons/ci";
// import { LiaEditSolid } from "react-icons/lia";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Search from "./Search";
// import Modal from "../../../utils/Modal";
// import UserModal from "./UserModal";
// import Loading from "../../Loading/Loading";
// import { Blog } from "../../../Context/Context";

// const HomeHeader = () => {
//   const [modal, setModal] = useState(false);
//   const [searchModal, setSearchModal] = useState(false);
//   const [loading, setLoading] = useState(true); // Initial loading state
//   const [isAdmin, setIsAdmin] = useState(false); // Tracks admin status
//   const { currentUser } = Blog(); // Fetch current user from Blog context
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // Check if currentUser is loaded and set admin status
//     if (currentUser) {
//       setIsAdmin(currentUser.isAdmin || false);
//       setLoading(false);
//     }
//   }, [currentUser]);

//   // Function to navigate to Videos
//   const goToVideos = () => {
//     navigate("/videos");
//   };

//   // Function to navigate to Add Admin page
//   const handleAddAdminClick = () => {
//     navigate("/add-admin"); // Navigate to the add admin page
//   };

//   if (loading) return <Loading />; // Show loading indicator while checking currentUser

//   return (
//     <header className="border-b border-gray-200">
//       <div className="size h-[60px] flex items-center justify-between">
//         {/* Left Section: Logo and Search */}
//         <div className="flex items-center gap-3">
//           <Link to={"/"}>
//             <span className="text-5xl">
//               <BsMedium />
//             </span>
//           </Link>
//           <Search modal={searchModal} setModal={setSearchModal} />
//         </div>

//         {/* Right Section: Buttons and Icons */}
//         <div className="flex items-center gap-3 sm:gap-7">
//           {/* Mobile Search Icon */}
//           <span
//             onClick={() => setSearchModal(true)}
//             className="flex sm:hidden text-3xl text-gray-300 cursor-pointer"
//           >
//             <CiSearch />
//           </span>

//           {/* Navigate to Videos Button */}
//           <button
//             onClick={goToVideos}
//             className="btn !bg-blue-500 !py-1 !text-white !rounded-full"
//           >
//             Vibes ⭐️
//           </button>

//           {/* Publish or Write Button */}
//           {pathname === "/write" ? (
//             <button
//               onClick={() => setPublish(true)}
//               className="btn !bg-green-700 !py-1 !text-white !rounded-full"
//             >
//               Publish
//             </button>
//           ) : (
//             <Link
//               to="/write"
//               className="hidden md:flex items-center gap-1 text-gray-500"
//             >
//               <span className="text-3xl">
//                 <LiaEditSolid />
//               </span>
//               <span className="text-sm mt-2">Write</span>
//             </Link>
//           )}

//           {/* Add Admin Button for Admin Users */}
//           {isAdmin && (
//             <button
//               onClick={handleAddAdminClick}
//               className="btn !bg-purple-600 !text-white !rounded-full"
//             >
//               Add Admin
//             </button>
//           )}

//           {/* Notifications Icon */}
//           <span className="text-3xl text-gray-500 cursor-pointer">
//             <IoMdNotificationsOutline />
//           </span>

//           {/* Profile Section */}
//           <div className="flex items-center relative">
//             <img
//               onClick={() => setModal(true)}
//               className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
//               src={currentUser?.userImg || "/profile.jpg"}
//               alt="profile-img"
//             />
//             <span className="text-gray-500 cursor-pointer">
//               <MdKeyboardArrowDown />
//             </span>
//             <Modal modal={modal} setModal={setModal}>
//               <div
//                 className={`${
//                   modal ? "visible opacity-100" : "invisible opacity-0"
//                 } transition-all duration-100`}
//               >
//                 <UserModal setModal={setModal} />
//               </div>
//             </Modal>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default HomeHeader;
import React, { useState, useEffect } from "react";
import { BsMedium } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import Modal from "../../../utils/Modal";
import UserModal from "./UserModal";
import Loading from "../../Loading/Loading";
import { Blog } from "../../../Context/Context";

const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading state initially true
  const { currentUser, setPublish } = Blog(); // Fetch currentUser and setPublish from Blog context
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentUser) {
      setLoading(false); // Stop the loading once currentUser data is fetched
    }
  }, [currentUser]); // This will run whenever currentUser changes

  const goToVideos = () => {
    navigate("/videos");
  };

  const handleAddAdminClick = () => {
    navigate("/add-admin");
  };

  // Show loader while currentUser is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <header className="border-b border-gray-200">
      <div className="size h-[60px] flex items-center justify-between">
        {/* Left Section: Logo and Search */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <span className="text-5xl">
              <BsMedium />
            </span>
          </Link>
          <Search modal={searchModal} setModal={setSearchModal} />
        </div>

        {/* Right Section: Buttons and Icons */}
        <div className="flex items-center gap-3 sm:gap-7">
          <span
            onClick={() => setSearchModal(true)}
            className="flex sm:hidden text-3xl text-gray-300 cursor-pointer"
          >
            <CiSearch />
          </span>

          <button
            onClick={goToVideos}
            className="btn !bg-blue-500 !py-1 !text-white !rounded-full"
          >
            Vibes ⭐️
          </button>

          {pathname === "/write" ? (
            <button
              onClick={() => setPublish(true)} // Trigger the publish logic when on "/write" page
              className="btn !bg-green-700 !py-1 !text-white !rounded-full"
            >
              Publish
            </button>
          ) : (
            <Link
              to="/write"
              className="hidden md:flex items-center gap-1 text-gray-500"
            >
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="text-sm mt-2">Write</span>
            </Link>
          )}

          {/* Add Admin Button for Admin Users */}
          {currentUser?.isAdmin && (
            <button
              onClick={handleAddAdminClick}
              className="btn !bg-purple-600 !text-white !rounded-full"
            >
              Add Admin
            </button>
          )}

          <span className="text-3xl text-gray-500 cursor-pointer">
            <IoMdNotificationsOutline />
          </span>

          <div className="flex items-center relative">
            <img
              onClick={() => setModal(true)}
              className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
              src={currentUser?.userImg || "/profile.jpg"}
              alt="profile-img"
            />
            <span className="text-gray-500 cursor-pointer">
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div
                className={`${
                  modal ? "visible opacity-100" : "invisible opacity-0"
                } transition-all duration-100`}
              >
                <UserModal setModal={setModal} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
