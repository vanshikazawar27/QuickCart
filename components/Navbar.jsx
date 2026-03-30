"use client"
import React from "react";
import { assets, CartIcon, BagIcon, HomeIcon, BoxIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navbar = () => {

  const pathname = usePathname();
  const { 
    isSeller, 
    router, 
    user, 
    search, 
    setSearch, 
    showSearch, 
    setShowSearch,
    wishlist
  } = useAppContext();
  const { openSignIn } = useClerk()

  return (
    <nav className="sticky top-0 z-50 glassmorphism flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 text-slate-700 transition-all duration-300">
      <div className="flex items-center gap-10">
        <Image
          className="cursor-pointer w-28 md:w-32 hover:scale-105 transition-transform duration-300"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />
        <div className="flex items-center gap-8 max-md:hidden">
          <Link href="/" className="font-medium hover:text-primary transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/all-products" className="font-medium hover:text-primary transition-colors relative group">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/" className="font-medium hover:text-primary transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-5">
           
           <div className={`flex items-center bg-slate-100 px-3 py-1.5 rounded-full transition-all duration-300 ${showSearch ? 'w-64 opacity-100' : 'w-10 opacity-100 bg-transparent'}`}>
            <Image 
              className="w-4 h-4 cursor-pointer min-w-[16px]" 
              src={assets.search_icon} 
              alt="search icon" 
              onClick={() => setShowSearch(!showSearch)}
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value && pathname !== '/all-products') router.push('/all-products');
              }}
              type="text"
              placeholder="Search products..."
              className={`bg-transparent outline-none text-xs ml-2 transition-all duration-300 ${showSearch ? 'w-full' : 'w-0'}`}
            />
            {showSearch && search && (
              <Image 
                onClick={() => setSearch('')}
                className="w-3 h-3 cursor-pointer ml-2 opacity-50 hover:opacity-100" 
                src={assets.cross_icon} 
                alt="clear" 
              />
            )}
          </div>
           <button 
            onClick={() => router.push('/wishlist')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors relative group"
          >
            <Image className="w-5 h-5" src={assets.heart_icon} alt="wishlist icon" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>
          
          {isSeller && (
            <button 
              onClick={() => router.push('/seller')} 
              className="text-xs font-semibold text-primary border border-primary/30 px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
            >
              Seller Dashboard
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 border-2 border-primary/20" } }}>
                <UserButton.MenuItems>
                  <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                  <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 font-medium hover:text-primary transition-all duration-300">
              <Image className="w-5 h-5" src={assets.user_icon} alt="user icon" />
              <span>Account</span>
            </button>
          )}
        </div>

        {/* Mobile menu logic remains same but with updated styles */}
        <div className="flex items-center md:hidden gap-3">
          {isSeller && (
            <button 
              onClick={() => router.push('/seller')} 
              className="text-[10px] font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-full"
            >
              Seller
            </button>
          )}
          {user ? (
            <UserButton>
               <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="p-2 hover:bg-slate-100 rounded-full">
              <Image className="w-5 h-5" src={assets.user_icon} alt="user icon" />
            </button>
          )}
        </div>
      </div>
    </nav>

  );
};

export default Navbar;