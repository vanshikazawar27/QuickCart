import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/user";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        await connectDB();

        const orders = await Order.find({ userId }).populate('items.product').sort({ date: -1 });

        return NextResponse.json({ success: true, data: orders });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}