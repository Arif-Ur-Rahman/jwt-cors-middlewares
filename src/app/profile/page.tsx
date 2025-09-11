"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    _id: "",
    isAdmin: false
  });

  useEffect(() => {
    // Attempt to get user details when component mounts
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      setUserDetails({
        username: res.data.data.username,
        email: res.data.data.email,
        _id: res.data.data._id,
        isAdmin: res.data.data.isAdmin || false
      });
      setData(res.data.data._id);
    } catch (error: any) {
      console.log("Error fetching user details", error.message);
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Profile Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-400">
            Manage your account information and settings
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/30">
          <div className="flex flex-col md:flex-row gap-8">
            {/* User Info Card */}
            <div className="md:w-1/2">
              <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-700/30">
                <h2 className="text-2xl font-semibold mb-6 text-green-400">User Information</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                    <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/20">
                      {userDetails.username || "Not available"}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/20">
                      {userDetails.email || "Not available"}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">User ID</label>
                    <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/20 break-all">
                      {data ? (
                        <Link 
                          href={`/profile/${data}`}
                          className="text-green-400 hover:text-green-300 transition-colors"
                        >
                          {data}
                        </Link>
                      ) : (
                        "Not available"
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Account Type</label>
                    <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/20">
                      {userDetails.isAdmin ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-800 text-red-100">
                          Administrator
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800 text-blue-100">
                          Standard User
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="md:w-1/2">
              <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-700/30 h-full flex flex-col justify-between">
                <h2 className="text-2xl font-semibold mb-6 text-green-400">Account Actions</h2>
                
                <div className="space-y-4">
                  <button
                    onClick={getUserDetails}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      "Refresh User Details"
                    )}
                  </button>

                  {/* Link to Users Page - Visible to all logged-in users */}
                  <Link 
                    href="/users" 
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    View All Users
                  </Link>
                  
                  <button
                    onClick={logout}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
                
                <div className="mt-8 pt-5 border-t border-gray-700/30">
                  <p className="text-sm text-gray-400 text-center">
                    Need help? Contact our support team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Protected account page • Your data is secure</p>
        </div>
      </div>
    </div>
  );
}