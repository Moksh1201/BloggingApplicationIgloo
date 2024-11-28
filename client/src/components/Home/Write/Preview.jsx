
// import React, { useState, useRef } from "react";
// import { LiaTimesSolid } from "react-icons/lia";
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
// import { toast } from "react-toastify";
// import { Blog } from "../../../Context/Context";
// import { useNavigate } from "react-router-dom";
// import axios from "../../../axiosInstance";

// const Preview = ({ setPublish, description, title }) => {
//   const imageRef = useRef(null);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [desc, setDesc] = useState(description);
//   const [preview, setPreview] = useState({
//     title: title || "",
//     photos: [],
//   });
//   const { currentUser } = Blog(); // Assumes currentUser contains username
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // Handle image file input (multiple files)
//   const handleImageChange = async (e) => {
//     const selectedFiles = e.target.files;
//     const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
//     const validFiles = [];
//     const validImageUrls = [];

//     Array.from(selectedFiles).forEach((file) => {
//       if (validImageTypes.includes(file.type)) {
//         validFiles.push(file);
//         validImageUrls.push(URL.createObjectURL(file)); // Preview URL
//       } else {
//         toast.error("Please select valid image files (JPEG, PNG, or GIF).");
//       }
//     });

//     setImageUrls(validImageUrls);
//     setFiles(validFiles); // Store the files to be uploaded
//     setPreview({ ...preview, photos: validFiles });
//   };

//   // Function to handle tag addition
//   const handleAddTag = (tag) => {
//     if (tag && !tags.includes(tag)) {
//       setTags([...tags, tag]);
//     }
//   };

//   // Function to remove a tag
//   const handleRemoveTag = (tagToRemove) => {
//     setTags(tags.filter(tag => tag !== tagToRemove));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       if (!preview.title.trim() || !desc.trim() || tags.length === 0 || files.length === 0) {
//         toast.error("All fields are required!");
//         setLoading(false);
//         return;
//       }

//       if (preview.title.length < 15) {
//         toast.error("Title must be at least 15 characters");
//         setLoading(false);
//         return;
//       }

//       // Prepare the form data (for multiple files)
//       const formData = new FormData();
//       formData.append("userId", currentUser.username);
//       formData.append("title", preview.title);
//       formData.append("content", desc);
//       formData.append("tags", tags.join(", "));

//       files.forEach((file, index) => {
//         formData.append("images", file); // Append each image file
//       });

//       const token = localStorage.getItem("authToken");
//       const response = await axios.post("/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status !== 201) {
//         throw new Error(`Failed to publish post: ${response.statusText}`);
//       }

//       toast.success("Post has been added");
//       navigate("/");
//       setPublish(false);
//       setPreview({ title: "", photos: [] });
//       setTags([]);
//       setFiles([]);
//       setImageUrls([]); // Clear the image previews
//     } catch (error) {
//       console.error("Error while publishing post:", error);
//       toast.error(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="absolute inset-0 bg-gray-100 z-30">
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
//         <span
//           onClick={() => setPublish(false)}
//           className="absolute right-6 top-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-900"
//         >
//           <LiaTimesSolid />
//         </span>
//         <div className="mt-10 flex flex-col md:flex-row gap-10">
//           <div className="flex-1">
//             <h3 className="text-2xl font-semibold mb-4">Story Preview</h3>
//             <div
//               onClick={() => imageRef.current.click()}
//               className="w-full h-48 object-cover bg-gray-200 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat rounded-md"
//             >
//               {imageUrls.length === 0 ? (
//                 <span className="text-gray-500">Add Image(s)</span>
//               ) : (
//                 <div className="flex gap-2">
//                   {imageUrls.map((url, index) => (
//                     <img
//                       key={index}
//                       src={url}
//                       alt="preview"
//                       className="w-20 h-20 object-cover rounded-md"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//             <input
//               onChange={handleImageChange}
//               ref={imageRef}
//               type="file"
//               hidden
//               multiple
//             />
//             <input
//               type="text"
//               placeholder="Title (min 15 characters)"
//               className="outline-none w-full border-b border-gray-300 py-2 mb-4"
//               value={preview.title}
//               onChange={(e) => setPreview({ ...preview, title: e.target.value })}
//             />
//             <ReactQuill
//               theme="bubble"
//               value={desc}
//               onChange={setDesc}
//               placeholder="Tell Your Story..."
//               className="py-3 border-b border-gray-300 mb-4"
//             />
//             <div className="mt-4">
//               <h4 className="font-semibold">Tags</h4>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {tags.map((tag, index) => (
//                   <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 flex items-center">
//                     {tag}
//                     <span onClick={() => handleRemoveTag(tag)} className="ml-2 cursor-pointer">×</span>
//                   </span>
//                 ))}
//               </div>
//               <input
//                 type="text"
//                 placeholder="Add a tag..."
//                 className="outline-none w-full border-b border-gray-300 py-2 mb-4"
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handleAddTag(e.target.value);
//                     e.target.value = ""; // Clear input after adding
//                   }
//                 }}
//               />
//               <div className="mt-2">
//                 <h5 className="font-semibold">Popular Tags:</h5>
//                 <button onClick={() => handleAddTag("Travel")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Travel</button>
//                 <button onClick={() => handleAddTag("Study")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Study</button>
//                 <button onClick={() => handleAddTag("Food")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Food</button>
//                 <button onClick={() => handleAddTag("Lifestyle")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Lifestyle</button>
//                 <button onClick={() => handleAddTag("Technology")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Technology</button>
//               </div>
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="btn bg-green-600 w-fit text-white rounded-full py-2 px-4 hover:bg-green-700 transition-colors mt-4"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Publish Now"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Preview;

import React, { useState, useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";
import { Blog } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosInstance";

const Preview = ({ setPublish, description, title }) => {
  const imageRef = useRef(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState(description);
  const [preview, setPreview] = useState({
    title: title || "",
    photos: [],
  });
  const { currentUser } = Blog(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const selectedFiles = e.target.files;
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const validFiles = [];
    const validImageUrls = [];

    Array.from(selectedFiles).forEach((file) => {
      if (validImageTypes.includes(file.type)) {
        validFiles.push(file);
        validImageUrls.push(URL.createObjectURL(file)); 
      } else {
        toast.error("Please select valid image files (JPEG, PNG, or GIF).");
      }
    });

    setImageUrls((prevUrls) => [...prevUrls, ...validImageUrls]);
    setFiles((prevFiles) => [...prevFiles, ...validFiles]); 
    setPreview({ ...preview, photos: [...preview.photos, ...validFiles] });
  };


  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!preview.title.trim() || !desc.trim() || tags.length === 0 || files.length === 0) {
        toast.error("All fields are required!");
        setLoading(false);
        return;
      }

      if (preview.title.length < 15) {
        toast.error("Title must be at least 15 characters");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("userId", currentUser.username);
      formData.append("title", preview.title);
      formData.append("content", desc);
      formData.append("tags", tags.join(", "));

      files.forEach((file, index) => {
        formData.append("images", file); 
      });

      const token = localStorage.getItem("authToken");
      const response = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        throw new Error(`Failed to publish post: ${response.statusText}`);
      }

      toast.success("Post has been added");
      navigate("/");
      setPublish(false);
      setPreview({ title: "", photos: [] });
      setTags([]);
      setFiles([]);
      setImageUrls([]); 
    } catch (error) {
      console.error("Error while publishing post:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="absolute inset-0 bg-gray-100 z-30">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-6 top-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-900"
        >
          <LiaTimesSolid />
        </span>
        <div className="mt-10 flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Story Preview</h3>
            <div
              onClick={() => imageRef.current.click()}
              className="w-full h-48 object-cover bg-gray-200 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat rounded-md"
            >
              {imageUrls.length === 0 ? (
                <span className="text-gray-500">Add Image(s)</span>
              ) : (
                <div className="flex gap-2">
                  {imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>
            <input
              onChange={handleImageChange}
              ref={imageRef}
              type="file"
              hidden
              multiple
            />
            <button
              onClick={() => imageRef.current.click()}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
            >
              Select More Images
            </button>
            <input
              type="text"
              placeholder="Title (min 15 characters)"
              className="outline-none w-full border-b border-gray-300 py-2 mb-4"
              value={preview.title}
              onChange={(e) => setPreview({ ...preview, title: e.target.value })}
            />
            <ReactQuill
              theme="bubble"
              value={desc}
              onChange={setDesc}
              placeholder="Tell Your Story..."
              className="py-3 border-b border-gray-300 mb-4"
            />
            <div className="mt-4">
              <h4 className="font-semibold">Tags</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 flex items-center">
                    {tag}
                    <span onClick={() => handleRemoveTag(tag)} className="ml-2 cursor-pointer">×</span>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a tag..."
                className="outline-none w-full border-b border-gray-300 py-2 mb-4"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag(e.target.value);
                    e.target.value = ""; 
                  }
                }}
              />
              <div className="mt-2">
                <h5 className="font-semibold">Popular Tags:</h5>
                <button onClick={() => handleAddTag("Travel")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Travel</button>
                <button onClick={() => handleAddTag("Study")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Study</button>
                <button onClick={() => handleAddTag("Food")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Food</button>
                <button onClick={() => handleAddTag("Lifestyle")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Lifestyle</button>
                <button onClick={() => handleAddTag("Technology")} className="mr-2 bg-gray-200 rounded-full px-3 py-1">Technology</button>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="btn bg-green-600 w-fit text-white rounded-full py-2 px-4 hover:bg-green-700 transition-colors mt-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Publish Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
