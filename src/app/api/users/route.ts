import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

// Establish database connection
connect();

export async function GET() {
  try {
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