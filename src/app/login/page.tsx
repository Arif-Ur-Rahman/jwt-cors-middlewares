"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-red-500">
      <h1 className="text-green-500">Login</h1>
      <hr />

        <label htmlFor="email">email</label>
        <input 
        type="text" 
        id="email" 
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        className="border border-gray-300 p-2 rounded-md w-64 mb-4 text-black"
        />

        <label htmlFor="password">password</label>
        <input 
        type="password" 
        id="password" 
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        className="border border-gray-300 p-2 rounded-md w-64 mb-4 text-black"
        />

        <button
        onClick={onLogin}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Sign Up Here
        </button>
        <Link href="/signup" className="mt-4 text-blue-500 hover:underline">
            Don't have an account? Sign Up
        </Link>
        
    </div>
  );
}
