import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      console.error('No user ID found in session');
      return NextResponse.json(
        { success: false, message: "Please sign in to update your cart" },
        { status: 401 }
      );
    }

    const { cartData } = await request.json();

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
        cartItems: {}
      });
    }

    // Update cart items
    user.cartItems = cartData || {};
    
    try {
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Cart updated successfully",
        cartItems: user.cartItems,
      });
    } catch (error) {
      console.error("Error saving user cart:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update cart" },
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
