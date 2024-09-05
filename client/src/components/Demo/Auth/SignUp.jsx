// src/components/SignUp.js
import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../axiosInstance'; // Import the axios instance

const SignUp = ({ setSignReq, setModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.username.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.rePassword.trim() === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    if (form.password !== form.rePassword) {
      toast.error("Passwords do not match");
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
        navigate("/");
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
        <Input form={form} setForm={setForm} type="text" title="username" />
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <Input
          form={form}
          setForm={setForm}
          type="password"
          title="rePassword"
        />
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
      flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All Sign Up Options
      </button>
    </div>
  );
};

export default SignUp;
