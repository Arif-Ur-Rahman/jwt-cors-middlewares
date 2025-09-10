"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  
  
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

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id)
  }
    
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-black text-2xl">
      <h1 className="text-green-500 mb-6">Profile Page</h1>
      <hr />
      <p>This is a protected profile page.</p>
      <h2
      className="p-3 rounded bg-green-500">
        {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

      <hr />
      <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-green-600">
        Logout
      </button>
      
      <button
      onClick={getUserDetails}
      className="bg-green-700 text-white px-4 py-2 mt-6 rounded-md hover:bg-green-600">
        Get User Details
      </button>
    </div>
  );
}
