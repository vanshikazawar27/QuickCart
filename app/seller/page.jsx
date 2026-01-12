'use client'
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !isSignedIn) return;
    setIsLoading(true);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      if (offerPrice) formData.append('offerPrice', offerPrice);

      // Only add files that exist
      files.forEach((file) => {
        if (file) {
          formData.append('images', file);
        }
      });
       
      await axios.post("/api/Product/add", formData,);

      const { data } = await axios.post('/api/Product/add', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setFiles([]);
        setName('');
        setDescription('');
        setCategory('Earphone');
        setPrice('');
        setOfferPrice('');
        // Clear file inputs
        document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
      } else {
        throw new Error(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Add product error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add product';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  className="hidden"
                  accept="image/*"
                />
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                  {files[index] ? (
                    <Image
                      src={URL.createObjectURL(files[index])}
                      alt={`Preview ${index + 1}`}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400">+</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            className="outline-none p-2 rounded border border-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Enter product description"
            className="outline-none p-2 rounded border border-gray-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none p-2 rounded border border-gray-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="price">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              placeholder="0.00"
              className="outline-none p-2 rounded border border-gray-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price ($)
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0.00 (optional)"
              className="outline-none p-2 rounded border border-gray-300"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 rounded-md text-white font-medium ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;