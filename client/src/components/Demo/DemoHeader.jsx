import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nav } from "../../data";
import Auth from "./Auth/Auth";
import { Blog } from "../../Context/Context";
import newlogo from "./Auth/newlogo.png";

const DemoHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const { authModel, setAuthModel } = Blog();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isActive ? "bg-[#5C7C89] shadow-md" : "bg-[#242424]"
      }`}>
      <div className="container mx-auto flex items-center justify-between h-[80px] px-6">
        <Link to={"/"}>
          <img
            className="h-10 transition-transform transform hover:scale-105"
            src={newlogo}
            alt="logo"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-[#FFFFFF]">
          {nav.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="hover:text-[#1F4959] transition-colors duration-300">
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAuthModel(true)}
            className="hidden md:block text-white bg-[#1F4959] hover:bg-[#5C7C89] transition-all duration-300 px-5 py-2 rounded-full font-semibold">
            Sign In
          </button>
          <Auth modal={authModel} setModal={setAuthModel} />
          <button
            onClick={() => setAuthModel(true)}
            className={`text-white rounded-full px-4 py-2 font-bold 
            ${isActive ? "bg-[#1F4959] hover:bg-[#5C7C89]" : "bg-[#5C7C89] hover:bg-[#1F4959]"} 
            transition-all duration-300`}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
