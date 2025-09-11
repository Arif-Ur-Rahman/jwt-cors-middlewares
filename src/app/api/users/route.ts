import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const userId = await getDataFromToken(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required", success: false },
        { status: 401 }
      );
    }
    
    // Allow all authenticated users to see the user list
    console.log("Fetching users from database...");
    
    // Fetch all users but exclude the password field
    const users = await User.find({}).select("-password");
    console.log(`Found ${users.length} users`);
    
    return NextResponse.json({ 
      success: true,
      users 
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}