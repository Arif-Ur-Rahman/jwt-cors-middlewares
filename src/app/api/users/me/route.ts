import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        // Check if userId is valid
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized - No user ID found" },
                { status: 401 }
            );
        }

        // Use findById instead of findOne
        const user = await User.findById(userId).select("-password");
        
        // Check if user exists
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User data fetched successfully", // Fixed typo: massage -> message
            data: user
        });
        
    } catch (error: any) {
        console.error("ME route error:", error);
        
        // Return 401 for authentication errors, 500 for server errors
        if (error.message.includes("token") || error.message.includes("Unauthorized")) {
            return NextResponse.json(
                { error: error.message },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}