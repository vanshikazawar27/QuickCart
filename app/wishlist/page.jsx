'use client'

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Wishlist = () => {
    const { products, wishlist } = useAppContext();
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        setWishlistProducts(products.filter(item => wishlist.includes(item._id)));
    }, [products, wishlist]);

    return (
        <div className="min-h-screen bg-slate-50/30">
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 pb-20">
                <div className="flex flex-col gap-2 mb-12">
                    <h1 className="section-title text-left uppercase tracking-tighter">My Wishlist</h1>
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                    <p className="text-slate-500 font-medium">You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
                </div>

                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {wishlistProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="p-6 bg-red-50 rounded-full animate-pulse">
                            <Image className="w-12 h-12" src={assets.heart_icon} alt="" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-slate-900">Your wishlist is empty</p>
                            <p className="text-slate-500 max-w-sm mx-auto">Start hearting your favorites and they'll show up here, waiting for you to bring them home.</p>
                        </div>
                        <button 
                            onClick={() => window.location.href = '/all-products'}
                            className="btn-primary"
                        >
                            Explore Store
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
