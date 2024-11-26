import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axiosInstance.post("/admin/add-admin", { username, email, password });
      navigate("/"); // Redirect after successful admin creation
    } catch (err) {
      console.error("Error adding admin:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-purple-800">
          Add New Admin
        </h2>
        <p className="text-sm text-center text-gray-500 mt-2">
          Fill in the details to create a new admin account.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-4 text-gray-500 cursor-pointer"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-10 right-4 text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
