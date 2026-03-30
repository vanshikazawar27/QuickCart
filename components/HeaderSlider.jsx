import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full mt-6 rounded-2xl shadow-elevated">
      <div
        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-12 md:py-20 md:px-20 px-8 min-w-full"
          >
            <div className="md:w-1/2 mt-12 md:mt-0 text-left">
              <p className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-bold tracking-wider uppercase mb-4 animate-fade-in">
                {slide.offer}
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6 animate-fade-up">
                {slide.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button className="btn-primary animate-fade-up [animation-delay:200ms]">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-8 py-3 font-semibold text-slate-700 hover:text-primary transition-all duration-300 animate-fade-up [animation-delay:400ms]">
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-2 transition-transform duration-300" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center animate-fade-in [animation-delay:300ms]">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                <Image
                  className="relative z-10 w-64 md:w-[400px] drop-shadow-2xl hover:scale-105 transition-transform duration-700 cursor-pointer"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              currentSlide === index ? "w-10 bg-primary" : "w-4 bg-slate-300 hover:bg-slate-400"
            }`}
             aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>

  );
};

export default HeaderSlider;
