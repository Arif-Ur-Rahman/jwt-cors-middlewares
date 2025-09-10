"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { log } from "console";

export default function SignupPage() {
    const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDesabled, setButtonDisabled] = React.
  useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", 
            user);
        console.log("Signup success", response.data);
        toast.success("Signup Successful. Please login now.");   
        router.push("/login");
    } catch (error : any) {
        console.log("Signup error", error.message);
        
        toast.error(error.message)
        
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 
        && user.password.length > 0 
        && user.username.length > 0) {
        setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-red-500">
      <h1 className="text-green-500">{loading? "Processing" : "Signup" }</h1>
      <hr />
      <label htmlFor="username">username</label>
        <input 
        type="text" 
        id="username" 
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="username"
        className="border border-gray-300 p-2 rounded-md w-64 mb-4 text-white"
        />

        <label htmlFor="email">email</label>
        <input 
        type="text" 
        id="email" 
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        className="border border-gray-300 p-2 rounded-md w-64 mb-4 text-white"
        />

        <label htmlFor="password">password</label>
        <input 
        type="password" 
        id="password" 
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        className="border border-gray-300 p-2 rounded-md w-64 mb-4 text-white"
        />

        <button
        onClick={onSignup}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          { buttonDesabled ? "No Sign Up" : "Sign Up" }
        </button>
        <Link href="/login" className="mt-4 text-blue-500 hover:underline">
          Already have an account? Login
        </Link>
        
    </div>
  );
}
