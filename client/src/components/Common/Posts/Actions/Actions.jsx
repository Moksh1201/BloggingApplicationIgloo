import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "../../../../utils/DropDown";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../../Context/Context";
import axiosInstance from "../../../../axiosInstance";
import { toast } from "react-toastify";

const Actions = ({ postId, title, desc }) => {
  const { setUpdateData, currentUser } = Blog();
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent
    setShowDrop(!showDrop);
  };

  const handleEdit = () => {
    navigate(`/editPost/${postId}`);
    setUpdateData({ title, description: desc });
  };

  const handleRemove = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      await axiosInstance.delete(`/posts/${postId}/likes`);
      await axiosInstance.delete(`/posts/${postId}/comments`);
      await axiosInstance.delete(`/users/${currentUser?.id}/savedPost/${postId}`);

      toast.success("Post has been removed");
      setShowDrop(false);
      navigate("/");
    } catch (error) {
      toast.error("Failed to remove the post: " + error.message);
    }
  };

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <BsThreeDots className="text-2xl" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
        <Button click={handleEdit} title="Edit Story" />
        <Button click={handleRemove} title="Delete Story" />
      </DropDown>
    </div>
  );
};

export default Actions;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left
    ${title === "Delete Story" ? "text-red-600" : ""}
    `}>
      {title}
    </button>
  );
};
