import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-slate-50/50 rounded-3xl my-16 border border-slate-100">
      <div className="space-y-4 max-w-2xl">
        <h1 className="section-title">
          Join the <span className="text-primary italic">QuickCart</span> Club
        </h1>
        <p className="text-slate-500 font-medium">
          Get elite access to exclusive deals, new arrivals, and <span className="text-slate-900 font-bold">20% off</span> your first order.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-0 mt-10 w-full max-w-md group overflow-hidden rounded-2xl shadow-elevated transition-shadow duration-300 hover:shadow-2xl">
        <input
          className="flex-1 border-none bg-white h-14 md:h-16 outline-none px-6 text-slate-700 placeholder:text-slate-400 font-medium w-full"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="h-14 md:h-16 px-10 bg-slate-900 text-white font-bold hover:bg-primary transition-colors duration-300 w-full sm:w-auto">
          Subscribe
        </button>
      </div>

      <p className="text-[10px] text-slate-400 mt-6 tracking-wide">
        By subscribing, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
};

export default NewsLetter;
