import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({
            success: true,
            message: "Successfully connected to the database"
        });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json(
            { 
                success: false, 
                message: "Failed to connect to the database",
                error: error.message 
            },
            { status: 500 }
        );
    }
}
