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
// import { toast } from "react-toastify";
// import { Blog } from "../../../Context/Context";

// const HomeHeader = () => {
//   const [modal, setModal] = useState(false);
//   const [searchModal, setSearchModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [title, setTitle] = useState(''); // Declare title
//   const [description, setDescription] = useState(''); // Declare description

//   const { publish, setPublish } = Blog();
//   const { pathname } = useLocation();
//   const editPath = pathname.split("/")[1];
//   const postId = pathname.split("/")[2];
//   const navigate = useNavigate();

//   // Fetch current user data
//   const fetchCurrentUser = async () => {
//     try {
//       const userId = currentUser?.id; 
//       const response = await fetch(`/profile/${userId}`);
//       const data = await response.json();
//       setUserData(data);
//     } catch (error) {
//       console.error("Error fetching current user:", error);
//     }
//   };

//   // Fetch post data for editing
//   const fetchPostData = async () => {
//     try {
//       const response = await fetch(`/posts/${postId}`);
//       const postData = await response.json();
//       setTitle(postData.title || '');
//       setDescription(postData.description || '');
//     } catch (error) {
//       console.error("Error fetching post data:", error);
//     }
//   };

//   // Update post logic
//   const handleEdit = async () => {
//     try {
//       setLoading(true);
//       await fetch(`/posts/${postId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, description }),
//       });
//       navigate(`/posts/${postId}`);
//       toast.success("Post has been updated");
//     } catch (error) {
//       console.error("Error updating post:", error);
//       toast.error("Failed to update post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch current user and post data when component mounts or currentUser changes
//   useEffect(() => {
//     if (currentUser?.id) {
//       fetchCurrentUser();
//     }
//     if (postId) {
//       fetchPostData();
//     }
//   }, [currentUser, postId]);

//   return (
//     <header className="border-b border-gray-200">
//       <div className="size h-[60px] flex items-center justify-between">
//         {loading && <Loading />}
//         {/* left side  */}
//         <div className="flex items-center gap-3">
//           <Link to={"/"}>
//             <span className="text-5xl">
//               <BsMedium />
//             </span>
//           </Link>
//           <Search modal={searchModal} setModal={setSearchModal} />
//         </div>
//         {/* right side  */}
//         <div className="flex items-center gap-3 sm:gap-7">
//           <span
//             onClick={() => setSearchModal(true)}
//             className="flex sm:hidden text-3xl text-gray-300 cursor-pointer">
//             <CiSearch />
//           </span>
//           {pathname === "/write" ? (
//             <button
//               onClick={() => setPublish(true)}
//               className="btn !bg-green-700 !py-1 !text-white !rounded-full">
//               Publish
//             </button>
//           ) : editPath === "editPost" ? (
//             <button
//               onClick={handleEdit}
//               className={`btn !bg-green-700 !py-1 !text-white !rounded-full ${
//                 loading ? "opacity-40" : ""
//               }`}>
//               {loading ? "Updating..." : "Save and Update"}
//             </button>
//           ) : (
//             <Link
//               to="/write"
//               className="hidden md:flex items-center gap-1 text-gray-500">
//               <span className="text-3xl">
//                 <LiaEditSolid />
//               </span>
//               <span className="text-sm mt-2">Write</span>
//             </Link>
//           )}
//           <span className="text-3xl text-gray-500 cursor-pointer">
//             <IoMdNotificationsOutline />
//           </span>
//           <div className="flex items-center relative">
//             <img
//               onClick={() => setModal(true)}
//               className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
//               src={userData?.userImg || "/profile.jpg"}
//               alt="profile-img"
//             />
//             <span className="text-gray-500 cursor-pointer">
//               <MdKeyboardArrowDown />
//             </span>
//             <Modal modal={modal} setModal={setModal}>
//               <div
//                 className={`${
//                   modal ? "visible opacity-100" : "invisible opacity-0"
//                 } transition-all duration-100`}>
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
import { toast } from "react-toastify";
import { Blog } from "../../../Context/Context";

const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { publish, setPublish } = Blog();
  const { pathname } = useLocation();
  const editPath = pathname.split("/")[1];
  const postId = pathname.split("/")[2];
  const navigate = useNavigate();

  // Function to navigate to videos section
  const goToVideos = () => {
    navigate("/videos");
  };

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      const userId = currentUser?.id; 
      const response = await fetch(`/profile/${userId}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  // Fetch post data for editing
  const fetchPostData = async () => {
    try {
      const response = await fetch(`/posts/${postId}`);
      const postData = await response.json();
      setTitle(postData.title || '');
      setDescription(postData.description || '');
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      fetchCurrentUser();
    }
    if (postId) {
      fetchPostData();
    }
  }, [currentUser, postId]);

  return (
    <header className="border-b border-gray-200">
      <div className="size h-[60px] flex items-center justify-between">
        {loading && <Loading />}
        
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <span className="text-5xl">
              <BsMedium />
            </span>
          </Link>
          <Search modal={searchModal} setModal={setSearchModal} />
        </div>

        <div className="flex items-center gap-3 sm:gap-7">
          <span
            onClick={() => setSearchModal(true)}
            className="flex sm:hidden text-3xl text-gray-300 cursor-pointer">
            <CiSearch />
          </span>

          {/* Navigate to Videos Button */}
          <button
            onClick={goToVideos}
            className="btn !bg-blue-500 !py-1 !text-white !rounded-full">
            Vibes ⭐️
          </button>

          {pathname === "/write" ? (
            <button
              onClick={() => setPublish(true)}
              className="btn !bg-green-700 !py-1 !text-white !rounded-full">
              Publish
            </button>
          ) : editPath === "editPost" ? (
            <button
              onClick={handleEdit}
              className={`btn !bg-green-700 !py-1 !text-white !rounded-full ${
                loading ? "opacity-40" : ""
              }`}>
              {loading ? "Updating..." : "Save and Update"}
            </button>
          ) : (
            <Link
              to="/write"
              className="hidden md:flex items-center gap-1 text-gray-500">
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="text-sm mt-2">Write</span>
            </Link>
          )}
          
          <span className="text-3xl text-gray-500 cursor-pointer">
            <IoMdNotificationsOutline />
          </span>
          <div className="flex items-center relative">
            <img
              onClick={() => setModal(true)}
              className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
              src={userData?.userImg || "/profile.jpg"}
              alt="profile-img"
            />
            <span className="text-gray-500 cursor-pointer">
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div
                className={`${
                  modal ? "visible opacity-100" : "invisible opacity-0"
                } transition-all duration-100`}>
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
