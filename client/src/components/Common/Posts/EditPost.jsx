import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Blog } from "../../../Context/Context";
import axios from 'axios';
import { toast } from "react-toastify";

const EditPost = () => {
  const { updateData, setUpdateData } = Blog(); // Assuming updateData contains the post details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateData) {
      setTitle(updateData.title || '');
      setDescription(updateData.description || '');
    }
  }, [updateData]);

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    if (!updateData?._id) {
      toast.error("Post ID is missing. Cannot update post.");
      return;
    }

    const updatedPost = {
      title,
      description,
      updatedAt: new Date().toISOString(),  
    };

    setLoading(true);
    try {
      await axios.put(`/posts/${updateData._id}`, updatedPost);
      toast.success("Post updated successfully");
      setUpdateData(null);  
    } catch (error) {
      toast.error("Failed to update post: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
      <input
        type="text"
        placeholder="Title..."
        className="text-4xl outline-none w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        placeholder="Description..."
        className="!text-[4rem] my-3"
        theme="bubble"
        value={description}
        onChange={setDescription}
      />
      <button
        onClick={handleUpdate}
        className="btn !text-white !bg-green-700 !rounded-full !text-xs mt-4"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Post"}
      </button>
    </section>
  );
};

export default EditPost;
