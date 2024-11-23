// import React, { useEffect, useRef, useState } from "react";
// import Modal from "../../../utils/Modal";
// import { LiaTimesSolid } from "react-icons/lia";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const EditProfile = ({ editModal, setEditModal, getUserData }) => {
//   const imgRef = useRef(null);
//   const [imgUrl, setImgUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     username: "",
//     userImg: "",
//     bio: "",
//   });

//   const btn = "border border-green-600 py-2 px-5 rounded-full text-green-600";
//   const navigate = useNavigate();

//   const openFile = () => {
//     imgRef.current.click();
//   };

//   useEffect(() => {
//     if (getUserData) {
//       setForm(getUserData);
//     } else {
//       setForm({ username: "", bio: "", userImg: "" });
//     }
//   }, [getUserData]);

//   const saveForm = async () => {
//     if (form["username"] === "" || form["bio"] === "") {
//       toast.error("All inputs are required!!!");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Handle image upload
//       let imageUrl = form.userImg;
//       if (typeof form.userImg === "object") {
//         const formData = new FormData();
//         formData.append("file", form.userImg);
//         formData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

//         const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
//           method: "POST",
//           body: formData,
//         });

//         const data = await response.json();
//         imageUrl = data.secure_url;
//       }

//       // Update user profile
//       const response = await fetch(`/profile/${getUserData?.userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           bio: form.bio,
//           username: form.username,
//           userImg: imageUrl,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update profile");
//       }

//       setLoading(false);
//       setEditModal(false);
//       toast.success("Profile has been updated");
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <Modal modal={editModal} setModal={setEditModal}>
//       <div
//         className="center w-[95%] md:w-[45rem] bg-white mx-auto shadow
//         my-[1rem] z-20 mb-[3rem] p-[2rem]">
//         {/* head  */}
//         <div className="flex items-center justify-between">
//           <h2 className="font-bold text-xl">Profile information</h2>
//           <button onClick={() => setEditModal(false)} className="text-xl">
//             <LiaTimesSolid />
//           </button>
//         </div>
//         {/* body  */}
//         <section className="mt-6">
//           <p className="pb-3 text-sm text-gray-500">Photo</p>
//           <div className="flex gap-[2rem]">
//             <div className="w-[5rem]">
//               <img
//                 className="min-h-[5rem] min-w-[5rem] object-cover border border-gray-400 rounded-full"
//                 src={
//                   imgUrl ? imgUrl : form.userImg ? form.userImg : "/profile.jpg"
//                 }
//                 alt="profile-img"
//               />
//               <input
//                 onChange={(e) => {
//                   setImgUrl(URL.createObjectURL(e.target.files[0]));
//                   setForm({ ...form, userImg: e.target.files[0] });
//                 }}
//                 accept="image/jpg, image/png, image/jpeg"
//                 ref={imgRef}
//                 type="file"
//                 hidden
//               />
//             </div>
//             <div>
//               <div className="flex gap-4 text-sm">
//                 <button onClick={openFile} className="text-green-600">
//                   Update
//                 </button>
//                 <button className="text-red-600">Remove</button>
//               </div>
//               <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
//                 Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
//                 side.
//               </p>
//             </div>
//           </div>
//         </section>
//         {/* Profile edit form  */}
//         <section className="pt-[1rem] text-sm">
//           <label className="pb-3 block" htmlFor="">
//             Name*
//           </label>
//           <input
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//             value={form.username}
//             type="text"
//             placeholder="username..."
//             className="p-1 border-b border-black w-full outline-none"
//             maxLength={50}
//           />
//           <p className="text-sm text-gray-600 pt-2">
//             Appears on your Profile page, as your byline, and in your responses.
//             {form.username.length}/50
//           </p>
//           <section className="pt-[1rem] text-sm">
//             <label className="pb-3 block" htmlFor="">
//               Bio*
//             </label>
//             <input
//               onChange={(e) => setForm({ ...form, bio: e.target.value })}
//               value={form.bio}
//               type="text"
//               placeholder="bio..."
//               className="p-1 border-b border-black w-full outline-none"
//               maxLength={160}
//             />
//             <p className="text-sm text-gray-600 pt-2">
//               Appears on your Profile and next to your stories.{" "}
//               {form.bio.length}/160
//             </p>
//           </section>
//         </section>
//         {/* foot  */}
//         <div className="flex items-center justify-end gap-4 pt-[2rem]">
//           <button onClick={() => setEditModal(false)} className={btn}>
//             Cancel
//           </button>
//           <button
//             onClick={saveForm}
//             className={`${btn} bg-green-800 text-white ${
//               loading ? "opacity-50" : ""
//             }`}>
//             Save
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default EditProfile;
import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance"; 

const EditProfile = ({ editModal, setEditModal, getUserData, setProfileData }) => {
  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    userImg: "",
    bio: "",
  });
  const [currentUserId, setCurrentUserId] = useState(null); // Store current user ID
  const btn = "border border-green-600 py-2 px-5 rounded-full text-green-600";
  const navigate = useNavigate();

  // Open file dialog to update profile picture
  const openFile = () => {
    imgRef.current.click();
  };

  // Set form values when user data is available
  useEffect(() => {
    if (getUserData) {
      setForm(getUserData);
    } else {
      setForm({ username: "", bio: "", userImg: "" });
    }
  }, [getUserData]);

  // Fetch current user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me"); // Fetch current user data
        setCurrentUserId(response.data.id); // Set current user ID
      } catch (error) {
        console.error("Error fetching current user:", error);
        toast.error("Unable to fetch user details. Please try again.");
        navigate("/login"); // Redirect to login if there's an error
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  // Handle form submission
  const saveForm = async () => {
    if (form["username"] === "" || form["bio"] === "") {
      toast.error("All inputs are required!!!");
      return;
    }

    setLoading(true);

    try {
      // Handle image upload
      let imageUrl = form.userImg;
      if (typeof form.userImg === "object") {
        const formData = new FormData();
        formData.append("file", form.userImg);
        formData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

        const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      // Update user profile
      const response = await axiosInstance.put(`/profile/${currentUserId}`, {
        bio: form.bio,
        username: form.username,
        userImg: imageUrl,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Immediately update the profile data in the parent component's state
      setProfileData({
        username: form.username,
        bio: form.bio,
        userImg: imageUrl,
      });

      setLoading(false);
      setEditModal(false);
      toast.success("Profile has been updated");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Modal modal={editModal} setModal={setEditModal}>
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadow my-[1rem] z-20 mb-[3rem] p-[2rem]">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Profile Information</h2>
          <button onClick={() => setEditModal(false)} className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        
        {/* Modal Body */}
        <section className="mt-6">
          <p className="pb-3 text-sm text-gray-500">Photo</p>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem]">
              <img
                className="min-h-[5rem] min-w-[5rem] object-cover border border-gray-400 rounded-full"
                src={imgUrl ? imgUrl : form.userImg ? form.userImg : "/profile.jpg"}
                alt="profile-img"
              />
              <input
                onChange={(e) => {
                  setImgUrl(URL.createObjectURL(e.target.files[0]));
                  setForm({ ...form, userImg: e.target.files[0] });
                }}
                accept="image/jpg, image/png, image/jpeg"
                ref={imgRef}
                type="file"
                hidden
              />
            </div>
            <div>
              <div className="flex gap-4 text-sm">
                <button onClick={openFile} className="text-green-600">
                  Update
                </button>
                <button className="text-red-600">Remove</button>
              </div>
              <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
              </p>
            </div>
          </div>
        </section>
        
        {/* Profile Edit Form */}
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor="">
            Name*
          </label>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
            type="text"
            placeholder="username..."
            className="p-1 border-b border-black w-full outline-none"
            maxLength={50}
          />
          <p className="text-sm text-gray-600 pt-2">
            Appears on your Profile page, as your byline, and in your responses.
            {form.username.length}/50
          </p>
          
          {/* Bio Section */}
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor="">
              Bio*
            </label>
            <input
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              value={form.bio}
              type="text"
              placeholder="bio..."
              className="p-1 border-b border-black w-full outline-none"
              maxLength={160}
            />
            <p className="text-sm text-gray-600 pt-2">
              Appears on your Profile and next to your stories. {form.bio.length}/160
            </p>
          </section>
        </section>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button onClick={() => setEditModal(false)} className={btn}>
            Cancel
          </button>
          <button
            onClick={saveForm}
            className={`${btn} bg-green-800 text-white ${loading ? "opacity-50" : ""}`}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
