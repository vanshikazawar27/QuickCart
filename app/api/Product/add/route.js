import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { v2 as cloudinary} from "cloudinary";
import { NextResponse } from "next/server";

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(request) {
    try {
        const {userId} = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized! Only sellers can add products." })
        }

        const formData = await request.formData()
    }catch (error) {
        
    }
}