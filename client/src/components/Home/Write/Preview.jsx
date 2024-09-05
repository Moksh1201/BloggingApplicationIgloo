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
  const [base64Image, setBase64Image] = useState(""); // State to store Base64 image
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState(description);
  const [preview, setPreview] = useState({
    title: title || "",
    photo: null,
  });
  const [userName, setUserName] = useState(""); // New state for user name
  const { currentUser } = Blog();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Function to convert image file to Base64
  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle image file input
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file)); // Display image preview
      setPreview({ ...preview, photo: file });
      try {
        const imageBase64 = await handleImageUpload(file);
        setBase64Image(imageBase64); // Set Base64 image string
        console.log("Image Base64 String:", imageBase64);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submitting post...");

    try {
      if (!preview.title.trim() || !desc.trim() || !tags.trim() || !userName.trim()) {
        toast.error("All fields are required!");
        setLoading(false);
        return;
      }

      if (preview.title.length < 15) {
        toast.error("Title must be at least 15 characters");
        setLoading(false);
        return;
      }

      // Prepare the JSON payload
      const payload = {
        userId: userName, // Include the user name in the payload
        title: preview.title,
        content: desc,
        tags: tags,
        // Add the Base64 image to payload if it exists
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
      setTags("");
      setUserName(""); // Clear the user name input after submission
      setBase64Image(""); // Clear Base64 image string
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
              hidden
            />
            <input
              type="text"
              placeholder="Title"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={preview.title}
              onChange={(e) => setPreview({ ...preview, title: e.target.value })}
            />
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
              <span className="font-bold capitalize">Milad Tech</span>
            </h3>
            <p>Add or change topics up to 5 so readers know what your story is about</p>
            <input
              type="text"
              placeholder="Enter tags"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
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
        {/* Display the Base64 image string for verification */}
        {base64Image && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Base64 Image String:</h4>
            <textarea
              readOnly
              value={base64Image}
              className="w-full h-[200px] border border-gray-300 p-2 mt-2"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Preview;
