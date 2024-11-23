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
  const [imageUrl, setImageUrl] = useState("");
  const [base64Image, setBase64Image] = useState(""); 
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState(""); 
  const [desc, setDesc] = useState(description);
  const [preview, setPreview] = useState({
    title: title || "",
    photo: null,
  });
  const [userName, setUserName] = useState(""); 
  const { currentUser } = Blog();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const popularTags = [
    "Travel", "Study", "Food", "Technology", "Health", "Fitness", "Fashion"
  ];

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file!");
        return;
      }

      setImageUrl(URL.createObjectURL(file)); 
      setPreview({ ...preview, photo: file });
      try {
        const imageBase64 = await handleImageUpload(file);
        setBase64Image(imageBase64); 
        console.log("Image Base64 String:", imageBase64);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  };


  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setCustomTag(""); 
    }
  };


  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submitting post...");

    try {
      if (!preview.title.trim() || preview.title.length < 15 || !desc.trim() || !userName.trim()) {
        toast.error("Title must be at least 15 characters and all fields are required!");
        setLoading(false);
        return;
      }

      const payload = {
        userId: userName, 
        title: preview.title,
        content: desc,
        tags: tags, 
        
        ...(base64Image && { image: base64Image }),
      };

      const token = localStorage.getItem("authToken");
      console.log("Token retrieved:", token);

      const response = await axios.post("/posts", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status !== 201) {
        throw new Error(`Failed to publish post: ${response.statusText}`);
      }

      toast.success("Post has been added");
      console.log("Post successfully published");
      navigate("/");
      setPublish(false);
      setPreview({ title: "", photo: null });
      setTags([]);
      setUserName(""); 
      setBase64Image(""); 
    } catch (error) {
      console.error("Error while publishing post:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      console.log("Submit process completed");
    }
  };

  return (
    <section className="absolute inset-0 bg-white z-30">
      <div className="size my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
        >
          <LiaTimesSolid />
        </span>
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h3>Story Preview</h3>
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              onClick={() => imageRef.current.click()}
              className="w-full h-[200px] object-cover bg-gray-100 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat"
            >
              {!imageUrl && "Add Image"}
            </div>
            <input
              onChange={handleImageChange}
              ref={imageRef}
              type="file"
              accept="image/*" 
              hidden
            />
            <input
              type="text"
              placeholder="Title"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={preview.title}
              onChange={(e) => setPreview({ ...preview, title: e.target.value })}
            />
            {preview.title.length < 15 && (
              <p className="text-red-500 text-sm">Title must be at least 15 characters</p>
            )}
            <ReactQuill
              theme="bubble"
              value={desc}
              onChange={setDesc}
              placeholder="Tell Your Story..."
              className="py-3 border-b border-gray-300"
            />
            <p className="text-gray-500 pt-4 text-sm">
              <span className="font-bold">Note:</span> Changes here will affect
              how your story appears in public places like Igloo’s homepage and
              in subscribers’ inboxes — not the contents of the story itself.
            </p>
          </div>
          <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
            <h3 className="text-2xl">
              Publishing to:
              <span className="font-bold capitalize"> MM Tech</span>
            </h3>
            <p>Add or change topics up to 5 so readers know what your story is about</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full bg-gray-300 hover:bg-gray-400 ${tags.includes(tag) ? "hidden" : ""}`}
                  onClick={() => addTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center bg-gray-200 px-2 py-1 rounded-full">
                  <span>{tag}</span>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeTag(tag)}
                  >
                    &times; {/* Cross button to remove the tag */}
                  </button>
                </div>
              ))}
            </div>
            {/* Custom Tag Input */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Add custom tag"
                className="outline-none w-full border-b border-gray-300 py-2"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTag(customTag); // Add tag on Enter key
                  }
                }}
              />
              <button
                onClick={() => addTag(customTag)}
                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter your name"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="btn !bg-green-800 !w-fit !text-white !rounded-full"
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
//   const [imageUrl, setImageUrl] = useState("");
//   const [base64Image, setBase64Image] = useState("");
//   const [tags, setTags] = useState([]);
//   const [desc, setDesc] = useState(description);
//   const [preview, setPreview] = useState({
//     title: title || "",
//     photo: null,
//   });
//   const { currentUser } = Blog(); // Assumes currentUser contains username
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // Function to convert image file to Base64
//   const handleImageUpload = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   // Handle image file input
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check if the selected file is an image
//       const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
//       if (!validImageTypes.includes(file.type)) {
//         toast.error("Please select a valid image file (JPEG, PNG, or GIF).");
//         return;
//       }
//       setImageUrl(URL.createObjectURL(file)); // Display image preview
//       setPreview({ ...preview, photo: file });
//       try {
//         const imageBase64 = await handleImageUpload(file);
//         setBase64Image(imageBase64); // Set Base64 image string
//       } catch (error) {
//         console.error("Error converting image to Base64:", error);
//       }
//     }
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
//       if (!preview.title.trim() || !desc.trim() || tags.length === 0) {
//         toast.error("All fields are required!");
//         setLoading(false);
//         return;
//       }

//       if (preview.title.length < 15) {
//         toast.error("Title must be at least 15 characters");
//         setLoading(false);
//         return;
//       }

//       // Prepare the JSON payload
//       const payload = {
//         userId: currentUser.username, // Automatically use the logged-in user's username
//         title: preview.title,
//         content: desc,
//         tags: tags.join(", "), // Join tags into a string
//         ...(base64Image && { image: base64Image }),
//       };

//       const token = localStorage.getItem("authToken");
//       const response = await axios.post("/posts", payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status !== 201) {
//         throw new Error(`Failed to publish post: ${response.statusText}`);
//       }

//       toast.success("Post has been added");
//       navigate("/");
//       setPublish(false);
//       setPreview({ title: "", photo: null });
//       setTags([]);
//       setBase64Image(""); // Clear Base64 image string
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
//               style={{ backgroundImage: `url(${imageUrl})` }}
//               onClick={() => imageRef.current.click()}
//               className="w-full h-48 object-cover bg-gray-200 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat rounded-md"
//             >
//               {!imageUrl && <span className="text-gray-500">Add Image</span>}
//             </div>
//             <input
//               onChange={handleImageChange}
//               ref={imageRef}
//               type="file"
//               hidden
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
