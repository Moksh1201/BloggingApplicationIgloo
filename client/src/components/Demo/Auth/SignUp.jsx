// import React, { useState } from "react";
// import Input from "../../../utils/Input";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye and eye-slash icons
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from '../../../axiosInstance'; // Import the axios instance

// const SignUp = ({ setSignReq, setModal }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     rePassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
//   const [showRePassword, setShowRePassword] = useState(false); // Toggle for confirm password

//   // Toggle password visibility
//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleShowRePassword = () => {
//     setShowRePassword(!showRePassword);
//   };

//   const validateForm = () => {
//     let formErrors = {};

//     // Username validation
//     if (!form.username.trim()) {
//       formErrors.username = "Username is required";
//     } else if (/^\d/.test(form.username)) { // Check if username starts with a number
//       formErrors.username = "Username cannot start with a number";
//     }

//     // Email validation
//     if (!form.email.trim()) {
//       formErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(form.email)) {
//       formErrors.email = "Email is not valid";
//     }

//     // Password validation (including uppercase, lowercase, number, special character)
//     if (!form.password.trim()) {
//       formErrors.password = "Password is required";
//     } else if (form.password.length < 6) {
//       formErrors.password = "Password must be at least 6 characters long";
//     } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(form.password)) {
//       formErrors.password = 
//         "Password must include an uppercase letter, lowercase letter, number, and special character";
//     }

//     // Confirm password validation
//     if (!form.rePassword.trim()) {
//       formErrors.rePassword = "Confirm password is required";
//     } else if (form.password !== form.rePassword) {
//       formErrors.rePassword = "Passwords do not match";
//     }

//     return formErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
//     setErrors(formErrors);

//     if (Object.keys(formErrors).length > 0) {
//       toast.error("Please fix the errors before submitting");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axiosInstance.post("/auth/register", {
//         username: form.username,
//         email: form.email,
//         password: form.password,
//       });

//       const { token } = response.data;

//       if (token) {
//         localStorage.setItem("authToken", token);
//         toast.success("Account created successfully");
//         navigate("/");
//         setModal(false);
//       } else {
//         toast.error("Failed to get authentication token");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error.response ? error.response.data : error.message);
//       toast.error(
//         error.response?.data?.error || "Failed to create account"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="size mt-[6rem] text-center">
//       <h2 className="text-3xl">Sign up with email</h2>
//       <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
//         Enter your email address to create a new account.
//       </p>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         {/* Username input */}
//         <Input form={form} setForm={setForm} type="text" title="username" />
//         {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

//         {/* Email input */}
//         <Input form={form} setForm={setForm} type="email" title="email" />
//         {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//         {/* Password field with eye/eye-slash icon */}
//         <div className="relative">
//           <Input
//             form={form}
//             setForm={setForm}
//             type={showPassword ? "text" : "password"}
//             title="password"
//           />
//           <button
//             type="button"
//             onClick={toggleShowPassword}
//             className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
//           >
//             {showPassword ? <FaEye /> : <FaEyeSlash />}
//           </button>
//         </div>
//         {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

//         {/* Confirm password field with eye/eye-slash icon */}
//         <div className="relative">
//           <Input
//             form={form}
//             setForm={setForm}
//             type={showRePassword ? "text" : "password"}
//             title="rePassword"
//           />
//           <button
//             type="button"
//             onClick={toggleShowRePassword}
//             className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
//           >
//             {showRePassword ? <FaEye /> : <FaEyeSlash />}
//           </button>
//         </div>
//         {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword}</p>}

//         <button
//           type="submit"
//           className={`px-4 py-1 text-sm rounded-full bg-green-700
//           hover:bg-green-800 text-white w-fit mx-auto
//           ${loading ? "opacity-50 pointer-events-none" : ""}`}
//         >
//           Sign Up
//         </button>
//       </form>
//       <button
//         onClick={() => setSignReq("")}
//         className="mt-5 text-sm text-green-600 hover:text-green-700
//         flex items-center mx-auto"
//       >
//         <MdKeyboardArrowLeft />
//         All Sign Up Options
//       </button>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye and eye-slash icons
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance"; // Import the axios instance

const SignUp = ({ setSignReq, setModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [showRePassword, setShowRePassword] = useState(false); // Toggle for confirm password

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const validateForm = () => {
    let formErrors = {};

    // Username validation
    if (!form.username.trim()) {
      formErrors.username = "Username is required";
    } else if (/^\d/.test(form.username)) { // Check if username starts with a number
      formErrors.username = "Username cannot start with a number";
    }

    // Email validation
    if (!form.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = "Email is not valid";
    }

    // Password validation (including uppercase, lowercase, number, special character)
    if (!form.password.trim()) {
      formErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(form.password)) {
      formErrors.password = 
        "Password must include an uppercase letter, lowercase letter, number, and special character";
    }

    // Confirm password validation
    if (!form.rePassword.trim()) {
      formErrors.rePassword = "Confirm password is required";
    } else if (form.password !== form.rePassword) {
      formErrors.rePassword = "Passwords do not match";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        toast.success("Account created successfully");

        // Navigate to homepage after successful registration
        navigate("/");

        // Close modal after successful registration
        setModal(false);
      } else {
        toast.error("Failed to get authentication token");
      }
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
      toast.error(
        error.response?.data?.error || "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign up with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter your email address to create a new account.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username input */}
        <Input form={form} setForm={setForm} type="text" title="username" />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        {/* Email input */}
        <Input form={form} setForm={setForm} type="email" title="email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Password field with eye/eye-slash icon */}
        <div className="relative">
          <Input
            form={form}
            setForm={setForm}
            type={showPassword ? "text" : "password"}
            title="password"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        {/* Confirm password field with eye/eye-slash icon */}
        <div className="relative">
          <Input
            form={form}
            setForm={setForm}
            type={showRePassword ? "text" : "password"}
            title="rePassword"
          />
          <button
            type="button"
            onClick={toggleShowRePassword}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            {showRePassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword}</p>}

        <button
          type="submit"
          className={`px-4 py-1 text-sm rounded-full bg-green-700
          hover:bg-green-800 text-white w-fit mx-auto
          ${loading ? "opacity-50 pointer-events-none" : ""}`}
        >
          Sign Up
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700
        flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All Sign Up Options
      </button>
    </div>
  );
};

export default SignUp;
