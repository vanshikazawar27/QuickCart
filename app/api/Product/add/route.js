import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

import { z } from "zod";

// Zod schema for product validation
const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.preprocess((val) => Number(val), z.number().positive("Price must be positive")),
  offerPrice: z.preprocess((val) => Number(val), z.number().min(0, "Offer price cannot be negative")),
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    // 1️⃣ Get user from Clerk cookie
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Check seller role
    const isSeller = await authSeller();
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Only sellers can add products" },
        { status: 403 }
      );
    }

    // 3️⃣ Read and validate form data
    const formData = await request.formData();

    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: formData.get("price"),
      offerPrice: formData.get("offerPrice"),
    };

    // Validate with Zod
    const validation = productSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const files = formData.getAll("images");
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image required" },
        { status: 400 }
      );
    }

    // 4️⃣ Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());

        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result.secure_url);
            }
          ).end(buffer);
        });
      })
    );

    // 5️⃣ Save to DB
    await connectDB();

    const newProduct = await Product.create({
      userId,
      ...validation.data,
      images: uploadedImages,
      date: Date.now(),
    });

    // 6️⃣ Success response
    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

