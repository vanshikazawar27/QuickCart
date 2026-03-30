import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router, wishlist, toggleWishlist } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="group flex flex-col items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 cursor-pointer"
        >
            <div className="relative aspect-square w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                    src={product?.images?.[0] || "/placeholder.png"}
                    alt={product?.name || "product"}
                    className="object-contain w-3/4 h-3/4 group-hover:scale-110 transition-transform duration-700"
                    width={400}
                    height={400}
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id) }}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 ${wishlist.includes(product._id) ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-sm hover:bg-white text-slate-900 shadow-sm'}`}
                >
                    <Image
                        className={`h-4 w-4 ${wishlist.includes(product._id) ? 'invert' : ''}`}
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-800 truncate flex-1 uppercase tracking-tight">{product.name}</p>
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                         <span className="text-[10px] font-bold text-slate-600">4.5</span>
                         <Image className="h-2.5 w-2.5" src={assets.star_icon} alt="star" />
                    </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px]">{product.description}</p>
            </div>

            <div className="flex items-center justify-between w-full mt-auto pt-2 border-t border-slate-50">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 line-through">{currency}{product.price || product.offerPrice * 1.2}</span>
                    <span className="text-lg font-extrabold text-primary">{currency}{product.offerPrice}</span>
                </div>
                <button className="bg-slate-900 text-white p-2 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Image className="w-4 h-4 invert" src={assets.redirect_icon} alt="buy" />
                </button>
            </div>
        </div>
    )
}

export default ProductCard