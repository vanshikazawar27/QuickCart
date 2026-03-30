'use client'

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import Image from "next/image";

const AllProducts = () => {
    const { products, search } = useAppContext();
    const [category, setCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        setFilteredProducts(productsCopy);
    }

    const sortProducts = () => {
        let fpCopy = filteredProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilteredProducts(fpCopy.sort((a, b) => (a.offerPrice - b.offerPrice)));
                break;
            case 'high-low':
                setFilteredProducts(fpCopy.sort((a, b) => (b.offerPrice - a.offerPrice)));
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, search, products]);

    useEffect(() => {
        sortProducts();
    }, [sortType]);

    // Extract categories dynamically
    const categories = [...new Set(products.map(item => item.category))];

    return (
        <div className="min-h-screen bg-slate-50/30">
            <Navbar />
            <div className="flex flex-col lg:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-10 pb-20">
                
                {/* Filter Sidebar */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <div 
                              onClick={() => setShowFilter(!showFilter)} 
                              className="flex items-center gap-2 cursor-pointer lg:cursor-default group"
                            >
                                <p className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors uppercase tracking-wider">Filters</p>
                                <Image 
                                    className={`h-3 lg:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} 
                                    src={assets.arrow_icon} 
                                    alt="" 
                                />
                            </div>
                            
                            <div className={`mt-6 space-y-6 transition-all duration-300 overflow-hidden ${showFilter ? 'max-h-96' : 'max-h-0 lg:max-h-none'}`}>
                                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-premium">
                                    <p className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-tighter">Categories</p>
                                    <div className="flex flex-col gap-3 text-sm font-medium text-slate-600">
                                        {categories.map((cat, index) => (
                                            <label key={index} className="flex items-center gap-3 cursor-pointer group">
                                                <input 
                                                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary" 
                                                    type="checkbox" 
                                                    value={cat} 
                                                    checked={category.includes(cat)}
                                                    onChange={toggleCategory}
                                                />
                                                <span className="group-hover:text-slate-900 transition-colors uppercase text-xs tracking-tight">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Area */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">SHOP ALL</h1>
                            <div className="w-12 h-1 bg-primary rounded-full"></div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort by</span>
                            <select 
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)} 
                                className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-full px-5 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
                            >
                                <option value="relevant">Relevant</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white rounded-3xl border border-dashed border-slate-200">
                             <div className="p-4 bg-slate-50 rounded-full">
                                <Image className="w-12 h-12 opacity-20" src={assets.search_icon} alt="" />
                             </div>
                             <p className="text-lg font-bold text-slate-900">No products found</p>
                             <p className="text-slate-500 max-w-xs mx-auto text-sm">We couldn't find anything matching your current filters. Try adjusting them!</p>
                             <button 
                                onClick={() => {setCategory([]); setSortType('relevant')}}
                                className="text-primary font-bold text-sm hover:underline"
                             >
                                Clear all filters
                             </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllProducts;
