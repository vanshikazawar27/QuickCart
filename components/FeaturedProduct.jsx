import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-24 space-y-12">
      <div className="flex flex-col items-center gap-2">
        <h2 className="section-title">Featured Collections</h2>
        <div className="w-16 h-1 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-16 px-6">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer shadow-premium">
            <Image
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8 space-y-3">
              <p className="text-white font-bold text-2xl lg:text-3xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {title}
              </p>
              <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-[240px]">
                {description}
              </p>
              <button className="flex items-center gap-2 w-fit px-6 py-2.5 bg-white text-slate-900 font-bold rounded-full text-sm transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:bg-primary hover:text-white">
                Shop Now
                <Image className="h-4 w-4" src={assets.redirect_icon} alt="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
