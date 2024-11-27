// import React, { useState, useEffect } from "react";
// import { BsMedium } from "react-icons/bs";
// import { CiSearch } from "react-icons/ci";
// import { LiaEditSolid } from "react-icons/lia";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { IoClose } from "react-icons/io5"; 
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Search from "./Search";
// import Modal from "../../../utils/Modal";
// import UserModal from "./UserModal";
// import Loading from "../../Loading/Loading";
// import { Blog } from "../../../Context/Context";

// const HomeHeader = () => {
//   const [modal, setModal] = useState(false);
//   const [searchModal, setSearchModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state
//   const [overlayVisible, setOverlayVisible] = useState(false); // Track overlay visibility
//   const { currentUser, setPublish } = Blog();
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   useEffect(() => {
//     if (currentUser) {
//       setLoading(false);
//     }
//   }, [currentUser]);

//   const goToVideos = () => {
//     navigate("/videos");
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//     setOverlayVisible(!overlayVisible); 
//   };

//   const handleAddAdminClick = () => {
//     navigate("/add-admin");
//   };

//   const handleDeleteUserClick = () => {
//     navigate("/delete-users");
//   };

//   const handleDeletePostClick = () => {

//     navigate("/admin-posts");
//   };
  

//   // Close the dropdown when the cross button is clicked
//   const closeDropdown = () => {
//     setDropdownOpen(false);
//     setOverlayVisible(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <header className="border-b border-gray-200 relative">
//       {/* Overlay behind dropdown when open */}
//       {overlayVisible && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
//           onClick={closeDropdown} // Close dropdown when clicking overlay
//         ></div>
//       )}

//       <div className="size h-[60px] flex items-center justify-between relative z-20">
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
//           <span
//             onClick={() => setSearchModal(true)}
//             className="flex sm:hidden text-3xl text-gray-300 cursor-pointer"
//           >
//             <CiSearch />
//           </span>

//           <button
//             onClick={goToVideos}
//             className="btn !bg-blue-500 !py-1 !text-white !rounded-full"
//           >
//             Vibes ⭐️
//           </button>

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

//           {/* Admin Check Dropdown for Admin Users */}
//           {currentUser?.isAdmin && (
//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="btn !bg-purple-600 !text-white !rounded-full flex items-center gap-2"
//               >
//                 Admin Options <MdKeyboardArrowDown />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md border border-gray-200 z-20 w-48">
//                   {/* Close button */}
//                   <div className="flex justify-between items-center p-2">
//                     <span className="font-semibold text-gray-800">Admin Menu</span>
//                     <button onClick={closeDropdown} className="text-gray-500">
//                       <IoClose className="text-xl" />
//                     </button>
//                   </div>
//                   <ul className="list-none p-2">
//                     <li>
//                       <button
//                         onClick={handleAddAdminClick}
//                         className="block text-gray-800 py-2 px-4 hover:bg-gray-100 w-full text-left"
//                       >
//                         Add Admin
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleDeleteUserClick}
//                         className="block text-gray-800 py-2 px-4 hover:bg-gray-100 w-full text-left"
//                       >
//                         Delete User
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleDeletePostClick}
//                         className="block text-gray-800 py-2 px-4 hover:bg-gray-100 w-full text-left"
//                       >
//                         Delete Post
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}

//           <span className="text-3xl text-gray-500 cursor-pointer">
//             <IoMdNotificationsOutline />
//           </span>

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
import { IoClose } from "react-icons/io5"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import Modal from "../../../utils/Modal";
import UserModal from "./UserModal";
import Loading from "../../Loading/Loading";
import { Blog } from "../../../Context/Context";

const HomeHeader = ({ setFilteredPost }) => {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state
  const [overlayVisible, setOverlayVisible] = useState(false); // Track overlay visibility
  const { currentUser, setPublish } = Blog();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  const goToVideos = () => {
    navigate("/videos");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setOverlayVisible(!overlayVisible); 
  };

  const handleAddAdminClick = () => {
    navigate("/add-admin");
  };

  const handleDeleteUserClick = () => {
    navigate("/delete-users");
  };

  const handleDeletePostClick = () => {
    navigate("/admin-posts");
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    setOverlayVisible(false);
  };

  const handlePostClick = (post) => {
    setFilteredPost(post); // Update filtered post when clicked
    navigate(`/post/${post._id}`); // Redirect to post page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <header className="border-b border-gray-300 bg-gray-900 text-white relative shadow-md">
      {overlayVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={closeDropdown}
        ></div>
      )}

      <div className="h-[70px] flex items-center justify-between px-6 relative z-20">
        <div className="flex items-center gap-5">
          <Link to={"/"}>
            <span className="text-4xl text-white">
              <BsMedium />
            </span>
          </Link>
          <Search modal={searchModal} setModal={setSearchModal} onPostClick={handlePostClick} />
        </div>

        <div className="flex items-center gap-5 sm:gap-7">
          <span
            onClick={() => setSearchModal(true)}
            className="flex sm:hidden text-3xl text-gray-400 cursor-pointer"
          >
            <CiSearch />
          </span>

          <button
            onClick={goToVideos}
            className="btn !bg-blue-600 !py-1 !text-white !rounded-full"
          >
            Vibes ⭐️
          </button>

          {pathname === "/write" ? (
            <button
              onClick={() => setPublish(true)}
              className="btn !bg-green-700 !py-1 !text-white !rounded-full"
            >
              Publish
            </button>
          ) : (
            <Link
              to="/write"
              className="hidden md:flex items-center gap-1 text-gray-300"
            >
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="text-sm mt-2">Write</span>
            </Link>
          )}

          {currentUser?.isAdmin && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="btn !bg-purple-700 !text-white !rounded-full flex items-center gap-2"
              >
                Admin Options <MdKeyboardArrowDown />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md border border-gray-200 z-20 w-48">
                  <div className="flex justify-between items-center p-2">
                    <span className="font-semibold text-gray-800">Admin Menu</span>
                    <button onClick={closeDropdown} className="text-gray-500">
                      <IoClose className="text-xl" />
                    </button>
                  </div>
                  <ul className="list-none p-2">
                    <li>
                      <button
                        onClick={handleAddAdminClick}
                        className="block text-gray-800 py-2 px-4 hover:bg-gray-100 w-full text-left"
                      >
                        Add Admin
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDeleteUserClick}
                        className="block text-gray-800 py-2 px-4 hover:bg-gray-100 w-full text-left"
                      >
                        Delete User
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDeletePostClick}
                        className="block text-gray-800 py-2 px-4 hover:bg-gray-100 w-full text-left"
                      >
                        Delete Post
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <span className="text-3xl text-gray-300 cursor-pointer">
            <IoMdNotificationsOutline />
          </span>

          <div className="flex items-center relative">
            <img
              onClick={() => setModal(true)}
              className="w-[2.5rem] h-[2.5rem] object-cover rounded-full cursor-pointer"
              src={currentUser?.userImg || "/profile.jpg"}
              alt="profile-img"
            />
            <span className="text-gray-400 cursor-pointer">
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
