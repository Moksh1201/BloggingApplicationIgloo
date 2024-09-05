import React, { useState } from "react";
import ReactQuill from "react-quill";
import Preview from "./Preview";
import { Blog } from "../../../Context/Context";

const Write = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { publish, setPublish } = Blog();

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Write a New Post</h1>
      
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="text-2xl border border-gray-300 rounded-md w-full p-2 mb-4 outline-none"
      />
      
      <ReactQuill
        theme="bubble"
        value={description}
        onChange={setDescription}
        placeholder="Tell Your Story..."
        className="border border-gray-300 rounded-md p-2 mb-4"
      />
      
      {publish && (
        <div className="transition-opacity duration-200">
          <Preview
            setPublish={setPublish}
            description={description}
            title={title}
          />
        </div>
      )}
    </section>
  );
};

export default Write;
