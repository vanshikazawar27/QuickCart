import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Please sign in to view your wishlist" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        success: true,
        wishlist: []
      });
    }

    return NextResponse.json({
      success: true,
      wishlist: user.wishlist || []
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Please sign in to update your wishlist" },
        { status: 401 }
      );
    }

    const { wishlist } = await request.json();

    await connectDB();

    // Find or create user
    let user = await User.findOne({ _id: userId });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        _id: userId,
        name: '',
        email: '',
        imageUrl: '',
        wishlist: []
      });
    }

    // Update wishlist items
    user.wishlist = wishlist || [];
    
    try {
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Wishlist updated successfully",
        wishlist: user.wishlist,
      });
    } catch (error) {
      console.error("Error saving user wishlist:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update wishlist" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
