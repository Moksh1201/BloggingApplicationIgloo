import React from "react";

const Banner = () => {
  return (
    <div className="bg-[#242424] border-b border-[#1F4959]">
      <div className="container mx-auto py-24 md:py-32 flex flex-col items-start gap-8 px-6 text-left">
        <h1 className="font-title text-5xl sm:text-6xl md:text-8xl font-extrabold leading-tight text-[#FFFFFF]">
          Stay Adventurous...!
        </h1>
        <p className="w-full md:w-[35rem] text-lg md:text-2xl font-medium leading-8 text-[#5C7C89]">
        Step out of your igloo to create new stories or Explore the stories from writers on any topic.
        </p>
        <button className="bg-[#1F4959] hover:bg-[#5C7C89] transition-all duration-300 rounded-full text-white text-lg md:text-xl px-10 py-4 mt-12 font-semibold">
          Start reading
        </button>
      </div>
    </div>
  );
};

export default Banner;
