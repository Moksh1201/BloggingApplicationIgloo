// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import Preview from "./Preview";
// import { Blog } from "../../../Context/Context";

// const Write = () => {
//   const [description, setDescription] = useState("");
//   const [title, setTitle] = useState("");
//   const { publish, setPublish } = Blog();

//   return (
//     <section className="w-full max-w-4xl mx-auto py-8 px-4">
//       <h1 className="text-3xl font-semibold mb-6">Write a New Post</h1>
      
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         type="text"
//         placeholder="Title"
//         className="text-2xl border border-gray-300 rounded-md w-full p-2 mb-4 outline-none"
//       />
      
//       <ReactQuill
//         theme="bubble"
//         value={description}
//         onChange={setDescription}
//         placeholder="Tell Your Story..."
//         className="border border-gray-300 rounded-md p-2 mb-4"
//       />
      
//       {publish && (
//         <div className="transition-opacity duration-200">
//           <Preview
//             setPublish={setPublish}
//             description={description}
//             title={title}
//           />
//         </div>
//       )}
//     </section>
//   );
// };

// export default Write;
// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import Preview from "./Preview";
// import { Blog } from "../../../Context/Context";

// const Write = () => {
//   const [description, setDescription] = useState("");
//   const [title, setTitle] = useState("");
//   const [blocks, setBlocks] = useState([{ type: "text", content: "" }]);
//   const { publish, setPublish } = Blog();
//   const [showDropdown, setShowDropdown] = useState(false);

//   const addBlock = (type) => {
//     setBlocks([...blocks, { type, content: "" }]);
//     setShowDropdown(false); // Close the dropdown after selecting an option
//   };

//   const removeBlock = (index) => {
//     setBlocks(blocks.filter((_, i) => i !== index));
//   };

//   const updateBlockContent = (index, newContent) => {
//     const updatedBlocks = blocks.map((block, i) =>
//       i === index ? { ...block, content: newContent } : block
//     );
//     setBlocks(updatedBlocks);
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && blocks[index].content === "") {
//       e.preventDefault();
//       removeBlock(index);
//     }
//   };

//   const handlePublish = () => {
//     setPublish(true); // Set the publish state to true when the button is clicked
//   };

//   return (
//     <section className="w-full max-w-4xl mx-auto py-8 px-4">
//       <h1 className="text-3xl font-semibold mb-6">Write a New Post</h1>

//       {/* Title Input */}
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         type="text"
//         placeholder="Title"
//         className="text-2xl border border-gray-300 rounded-md w-full p-2 mb-4 outline-none"
//       />

//       {/* Render all content blocks */}
//       {blocks.map((block, index) => (
//         <div key={index} className="relative group mb-4">
//           {/* Minus Button */}
//           <button
//             onClick={() => removeBlock(index)}
//             className="absolute -left-10 top-2 text-xl text-red-500 hover:text-red-700"
//           >
//             -
//           </button>

//           {/* Text Block */}
//           {block.type === "text" && (
//             <ReactQuill
//               theme="snow"
//               value={block.content}
//               onChange={(content) => updateBlockContent(index, content)}
//               placeholder="Type your content..."
//               className="border border-gray-300 rounded-md p-2"
//               onKeyDown={(e) => handleKeyDown(e, index)}
//             />
//           )}

//           {/* Image Block */}
//           {block.type === "image" && (
//             <div className="border border-gray-300 rounded-md p-2 flex flex-col items-center">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   updateBlockContent(
//                     index,
//                     URL.createObjectURL(e.target.files[0])
//                   )
//                 }
//                 className="mb-2"
//               />
//               {block.content && (
//                 <img
//                   src={block.content}
//                   alt="Uploaded"
//                   className="w-full max-h-60 object-cover mt-2"
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Plus Button with Animated Dropdown */}
//       <div className="relative flex items-center mt-4">
//         <button
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="relative px-3 py-2 text-lg text-green-600 border border-green-600 rounded-full focus:outline-none"
//         >
//           +
//         </button>

//         {/* Dropdown */}
//         {showDropdown && (
//           <div
//             className="dropdown"
//             style={{
//               position: "absolute",
//               top: "100%",
//               left: 0,
//               width: "200px",
//               background: "white",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               padding: "8px 0",
//               opacity: 1,
//               transform: "translateY(0)",
//               transition: "all 0.3s ease-in-out",
//               zIndex: 10,
//             }}
//           >
//             <button
//               onClick={() => addBlock("text")}
//               className="dropdown-item"
//               style={{
//                 display: "block",
//                 padding: "12px 20px",
//                 fontSize: "14px",
//                 color: "#333",
//                 cursor: "pointer",
//                 border: "none",
//                 background: "transparent",
//                 width: "100%",
//                 textAlign: "left",
//               }}
//             >
//               Add Text
//             </button>
//             <button
//               onClick={() => addBlock("image")}
//               className="dropdown-item"
//               style={{
//                 display: "block",
//                 padding: "12px 20px",
//                 fontSize: "14px",
//                 color: "#333",
//                 cursor: "pointer",
//                 border: "none",
//                 background: "transparent",
//                 width: "100%",
//                 textAlign: "left",
//               }}
//             >
//               Add Image
//             </button>
//           </div>
//         )}
//       </div>
     

//       {/* Preview */}
//       {publish && (
//         <div className="transition-opacity duration-200 mt-4">
//           <Preview
//             setPublish={setPublish}
//             description={description}
//             title={title}
//           />
//         </div>
//       )}
//     </section>
//   );
// };

// export default Write;
import React, { useState } from "react";
import ReactQuill from "react-quill";
import Preview from "./Preview";
import { Blog } from "../../../Context/Context";

const Write = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([{ type: "text", content: "" }]);
  const { publish, setPublish } = Blog();
  const [showDropdown, setShowDropdown] = useState(false);
  const [tags, setTags] = useState([]);

  const addBlock = (type) => {
    setBlocks([...blocks, { type, content: "" }]);
    setShowDropdown(false); // Close the dropdown after selecting an option
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlockContent = (index, newContent) => {
    const updatedBlocks = blocks.map((block, i) =>
      i === index ? { ...block, content: newContent } : block
    );
    setBlocks(updatedBlocks);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && blocks[index].content === "") {
      e.preventDefault();
      removeBlock(index);
    }
  };

  const handlePublish = () => {
    setPublish(true); // Set the publish state to true when the button is clicked
  };

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Write a New Post</h1>

      {/* Title Input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="text-2xl border border-gray-300 rounded-md w-full p-2 mb-4 outline-none"
      />

      {/* Render all content blocks */}
      {blocks.map((block, index) => (
        <div key={index} className="relative group mb-4">
          {/* Minus Button */}
          <button
            onClick={() => removeBlock(index)}
            className="absolute -left-10 top-2 text-xl text-red-500 hover:text-red-700"
          >
            -
          </button>

          {/* Text Block */}
          {block.type === "text" && (
            <ReactQuill
              theme="snow"
              value={block.content}
              onChange={(content) => updateBlockContent(index, content)}
              placeholder="Type your content..."
              className="border border-gray-300 rounded-md p-2"
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          )}

          {/* Image Block */}
          {block.type === "image" && (
            <div className="border border-gray-300 rounded-md p-2 flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateBlockContent(
                    index,
                    URL.createObjectURL(e.target.files[0])
                  )
                }
                className="mb-2"
              />
              {block.content && (
                <img
                  src={block.content}
                  alt="Uploaded"
                  className="w-full max-h-60 object-cover mt-2"
                />
              )}
            </div>
          )}
        </div>
      ))}

      {/* Plus Button with Animated Dropdown */}
      <div className="relative flex items-center mt-4">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative px-3 py-2 text-lg text-green-600 border border-green-600 rounded-full focus:outline-none"
        >
          +
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="dropdown"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "200px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "8px 0",
              opacity: 1,
              transform: "translateY(0)",
              transition: "all 0.3s ease-in-out",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => addBlock("text")}
              className="dropdown-item"
              style={{
                display: "block",
                padding: "12px 20px",
                fontSize: "14px",
                color: "#333",
                cursor: "pointer",
                border: "none",
              }}
            >
              Text
            </button>
            <button
              onClick={() => addBlock("image")}
              className="dropdown-item"
              style={{
                display: "block",
                padding: "12px 20px",
                fontSize: "14px",
                color: "#333",
                cursor: "pointer",
                border: "none",
              }}
            >
              Image
            </button>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mt-4">
        <h4 className="font-semibold">Tags</h4>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white rounded-full px-3 py-1 flex items-center"
            >
              {tag}
              <span
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 cursor-pointer"
              >
                ×
              </span>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add a tag..."
          className="outline-none w-full border-b border-gray-300 py-2 mb-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag(e.target.value);
              e.target.value = ""; // Clear input after adding
            }
          }}
        />
      </div>

      {/* Preview Button */}
      <button
        onClick={handlePublish}
        className="btn bg-green-600 w-fit text-white rounded-full py-2 px-4 hover:bg-green-700 transition-colors mt-4"
      >
        Preview
      </button>

      {/* Pass description, title, and tags to the preview component */}
      {publish && (
        <Preview
          setPublish={setPublish}
          description={description}
          title={title}
          tags={tags}
        />
      )}
    </section>
  );
};

export default Write;
