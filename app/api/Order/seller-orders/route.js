
import { NextResponse } from "next/server"
import connectDB from "@/config/db"
import Order from "@/models/Order"
import { getAuth } from "@clerk/nextjs/server"
import authSeller from "@/lib/authSeller"

export async function GET(request) {
    try {
        const {userId} = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" })
        }

        await connectDB()

        const orders = await Order.find({}).populate('items.product')

        return NextResponse.json({ success: true, orders: orders })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}