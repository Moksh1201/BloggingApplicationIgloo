import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons for show/hide password
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../axiosInstance';
import { Blog } from '../../../Context/Context';

const SignIn = ({ setSignReq }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = Blog();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Validation checks
  const validateForm = () => {
    let formErrors = {};

    // Email validation
    if (!form.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = "Email is not valid";
    }

    // Password validation
    if (!form.password.trim()) {
      formErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
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
      const response = await axiosInstance.post("/auth/login", form);

      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        setCurrentUser({ token }); // Update context state
        toast.success("User has been logged in");
        navigate("/"); // Redirect to home page
      } else {
        toast.error("Failed to get authentication token");
      }
    } catch (error) {
      if (form.password.length >= 6) {
        // Show incorrect password error if password length is valid but still wrong
        setErrors({ password: "Incorrect password" });
      } else {
        toast.error(error.response?.data?.message || "Failed to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign in with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter your email address and password to sign in.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Input */}
        <Input form={form} setForm={setForm} type="email" title="email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Password Input with eye icon to toggle visibility */}
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
            {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-1 text-sm rounded-full bg-green-700
          hover:bg-green-800 text-white w-fit mx-auto
          ${loading ? "opacity-50 pointer-events-none" : ""}`}
        >
          Sign In
        </button>
      </form>

      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All Sign In Options
      </button>
    </div>
  );
};

export default SignIn;
