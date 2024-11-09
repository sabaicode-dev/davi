"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios";
import LoginForm from "@/app/(auth)/login/Components/LoginFrom";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await axiosInstance.post("/v1/auth/signin", {
        email,
        password,
      });
      if (response.status === 200) {
        router.push("/www.google.com");
      } else {
        setError("Failed to verify code. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await axiosInstance.get("/v1/auth/google");
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Google Sign-up error:", err);
    }
  };

  const handleBack = () => router.push("/");

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col justify-center w-full sm:w-1/2 p-8 sm:p-12 lg:p-24 bg-white rounded-r-3xl">
        <div className="sm:max-w-md w-full mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            <BiArrowBack size={24} />
          </button>
          <h2 className="text-3xl font-bold mb-4">LOGIN</h2>
          <p className="text-gray-600 mb-8">Welcome back!</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <LoginForm
            onSubmit={handleLogin}
            onGoogleSignUp={handleGoogleSignUp}
          />
          <p className="text-xs text-gray-400 mt-4">
            {`Don't have an account? `}
            <button
              onClick={() => router.push("/signup")}
              className="underline text-blue-500"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
      <div className="hidden sm:block w-1/2 lg:w-1/2 relative">
        <div className="h-full w-full flex items-center justify-center bg-blue-500 rounded-l-3xl">
          <Image
            src="/images/auth-images/login.png"
            alt="Login"
            width={500}
            height={500}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
