import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      toast.error("All fields are required!!!");
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
      }  else {
        toast.error("Failed to get authentication token");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to sign in");
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
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
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
        className="mt-5 text-sm text-green-600 hover:text-green-700
      flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All sign In Options
      </button>
    </div>
  );
};

export default SignIn;
