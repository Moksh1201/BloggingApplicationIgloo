import React, { useEffect } from "react";
import { LiaUserSolid } from "react-icons/lia";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { LiaEditSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { Blog } from "../../../Context/Context";
import { secretEmail } from "../../../utils/helper";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const UserModal = ({ setModal }) => {
  const { currentUser, setCurrentUser } = Blog();
  const navigate = useNavigate();

  // Ensure currentUser is valid and has an email
  console.log("Current User:", currentUser);

  if (!currentUser) {
    return <Loading />;
  }

  const userModal = [
    {
      title: "Profile",
      icon: <LiaUserSolid />,
      path: `/profile/${currentUser.id}`,
    },
    {
      title: "Library",
      icon: <MdOutlineLocalLibrary />,
      path: "/library",
    },
    {
      title: "Stories",
      icon: <BiSpreadsheet />,
      path: "/stories",
    },
    {
      title: "Stats",
      icon: <HiOutlineChartBar />,
      path: "/stats",
    },
  ];

  const logout = async () => {
    try {
      await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("authToken");
      setCurrentUser(null);
      navigate("/login", { replace: true });
      toast.success("User has been logged out");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out: " + error.message);
    }
  };

  return (
    <section className="absolute w-[18rem] p-6 bg-white right-0 top-[100%] shadow rounded-md z-50 text-gray-500">
      <Link to="/write" className="flex md:hidden items-center gap-1 text-gray-500">
        <span className="text-3xl">
          <LiaEditSolid />
        </span>
        <span className="text-sm mt-2">Write</span>
      </Link>
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-5">
        {userModal.map((link, i) => (
          <Link
            onClick={() => setModal(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-black/70"
            key={i}
            to={link.path}>
            <span className="text-2xl">{link.icon}</span>
            <h2 className="text-md">{link.title}</h2>
          </Link>
        ))}
      </div>
      <button
        onClick={logout}
        className="flex flex-col pt-5 cursor-pointer hover:text-black/70">
        Sign Out
        <span className="text-sm">
          {currentUser.email ? secretEmail(currentUser.email) : 'Email not available'}
        </span>
      </button>
    </section>
  );
};

export default UserModal;
