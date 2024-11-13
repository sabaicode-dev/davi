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

      // if (response.status === 200) {
      //   // On successful login, navigate to your dashboard page
      //   router.push("http://localhost:8080");
      // } else {
      //   setError("Login failed. Please try again.");
      // }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await axiosInstance.get("/v1/auth/google");

      // Check if the response contains the redirect URL
      if (response.data && response.data.url) {
        // Redirect the browser to Google's OAuth URL
        window.location.href = response.data.url;
      } else {
        console.error("Google Sign-in URL not found in response.");
        alert("And error occurred during Google login.");
      }
    } catch (err) {
      console.error("Google Sign-up error:", err);
      alert("An error occurred during Google login.");
    }
  };

  console.log(error);

  const handleBack = () => router.push("/");

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <div className="flex flex-col justify-center w-full sm:w-1/2 p-8 sm:p-12 lg:p-24 bg-white rounded-r-3xl">
        <div className="sm:max-w-md w-full mx-auto">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            <BiArrowBack size={24} />
          </button>
          <h2 className="text-3xl font-bold mb-4">LOGIN</h2>
          <p className="text-gray-600 mb-8">Welcome back!</p>

          {/* Display error message */}
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}{" "}
              {error ===
                "Account does not exist. Would you like to sign up?" && (
                <button
                  onClick={() => router.push("/signup")}
                  className="text-blue-500 underline ml-2"
                >
                  Sign Up
                </button>
              )}
            </div>
          )}

          {/* LoginForm with handleLogin */}
          <LoginForm onSubmit={handleLogin} />

          {/* Divider */}
          <div className="relative flex items-center justify-center text-sm mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500 bg-white">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign in with Google */}
          <div className="mt-4">
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Google icon */}
                <path
                  d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                  fill="#3F83F8"
                />
                <path
                  d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                  fill="#34A853"
                />
                <path
                  d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                  fill="#FBBC04"
                />
                <path
                  d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Signup redirect */}
          <div className="mt-4">
            <p className="text-xs text-gray-400">
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
      </div>

      {/* Right Section - Image */}
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
