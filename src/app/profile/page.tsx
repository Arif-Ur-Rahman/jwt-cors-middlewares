"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  
  
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      window.location.href = "/login";
      
      
    } catch (error:any) {
      console.log("Logout error", error.message);
      toast.error(error.message);

      
    }


  }
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-red-500">
      <h1 className="text-green-500">Profile Page</h1>
      <hr />
      <p>This is a protected profile page.</p>

      <hr />
      <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-green-600">
        Logout
      </button>
    </div>
  );
}
