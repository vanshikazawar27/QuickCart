import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-0 bg-gradient-to-r from-slate-100 to-slate-200 my-24 rounded-3xl overflow-hidden shadow-premium group">
      <div className="relative md:w-1/3 flex justify-center">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
        <Image
          className="relative z-10 max-w-56 hover:scale-110 transition-transform duration-700"
          src={assets.jbl_soundbox_image}
          alt="jbl_soundbox_image"
        />
      </div>
      
      <div className="md:w-1/3 flex flex-col items-center justify-center text-center space-y-6 mt-12 md:mt-0">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tighter">
          Level Up Your <span className="text-primary italic">Gaming</span> Experience
        </h2>
        <p className="max-w-[340px] text-slate-600 font-medium leading-relaxed">
          From immersive sound to precise controls—everything you need to dominate.
        </p>
        <button className="btn-primary group">
          Get Started
          <Image className="group-hover:translate-x-2 transition-transform duration-300 ml-2 invert" src={assets.arrow_icon_white} alt="arrow" />
        </button>
      </div>

      <div className="md:w-1/3 flex justify-center mt-12 md:mt-0 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
        <Image
          className="hidden md:block max-w-xs drop-shadow-2xl"
          src={assets.md_controller_image}
          alt="md_controller_image"
        />
        <Image
          className="md:hidden max-w-xs drop-shadow-xl"
          src={assets.sm_controller_image}
          alt="sm_controller_image"
        />
      </div>
    </div>
  );
};

export default Banner;