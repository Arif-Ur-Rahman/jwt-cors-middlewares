"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDesabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login Successful");
      router.push("/profile");


    } catch (error: any) {
      console.log("Login error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-red-500">
      <h1 className="text-green-500">{loading ? "processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="border border-gray-300 p-2 rounded-md w-64 mb-4 text-white bg-gray-700"
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="border border-gray-300 p-2 rounded-md w-64 mb-4 text-white bg-gray-700"
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
