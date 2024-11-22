"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios"; // Adjust this import path based on your project structure
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import CryptoJS from "crypto-js";

require("dotenv").config();

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, setCountdown] = useState(60);
  // const [secretKey, setSecretKey] = useState<string>("");

  const router = useRouter();

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";

 
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const encryptedUsername = localStorage.getItem("username");
    const encryptedPassword = localStorage.getItem("password");

    if (storedEmail && encryptedUsername && encryptedPassword) {
      try {
        if (!secretKey) throw new Error("Secret key is missing");
        // Decrypt username and password
        const decryptedUsername = CryptoJS.AES.decrypt(
          encryptedUsername,
          String(secretKey)
        ).toString(CryptoJS.enc.Utf8);
        const decryptedPassword = CryptoJS.AES.decrypt(
          encryptedPassword,
          String(secretKey)
        ).toString(CryptoJS.enc.Utf8);

        // console.log("Decrypted Username:", decryptedUsername);
        // console.log("Decrypted Password:", decryptedPassword);

        setEmail(storedEmail);
        setPassword(decryptedPassword);
      } catch (err) {
        console.log(err);

        setError("Failed to decrypt data. Please try signing up again.");
      }
    } else {
      setError("Email or password is missing. Please try signing up again.");
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move focus to next input if value is not empty
      if (value && index < 5) {
        const nextInput = document.getElementById(
          `code-${index + 1}`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index]) {
      if (index > 0) {
        const prevInput = document.getElementById(
          `code-${index - 1}`
        ) as HTMLInputElement;
        if (prevInput) prevInput.focus();

        const newCode = [...verificationCode];
        newCode[index - 1] = "";
        setVerificationCode(newCode);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = verificationCode.join("");

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/v1/auth/confirm", {
        email, // Include email from localStorage
        confirmationCode: code, // 6-digit code entered by the user
        password, // Include password from localStorage
      });

      if (response.status === 200) {
        setSuccess(true);
        router.push("http://localhost:8080"); // Redirect to dashboard
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.post("/v1/auth/resend-code", { email });
      setCountdown(60);
      setError("A new verification code has been sent to your email.");
    } catch (err) {
      setError("Failed to resend the code. Please try again.");
      console.error("Resend code error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen place-content-center w-full">
      <div className="max-w-screen-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 flex justify-center items-center">
          <Image
            src="/images/auth-images/verify.png"
            width={200}
            height={200}
            alt="Verification"
            unoptimized
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Email Verification
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code-0"
              className="block text-sm font-medium text-gray-500 mb-4"
            >
              Enter the verification code sent to:
              <span className="underline">{email}</span>
            </label>
            <div className="flex gap-2 justify-center">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle className="mr-2" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center text-green-600 mb-4">
              <CheckCircle2 className="mr-2" />
              <p>Email verified successfully!</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400 space-x-2">
          {`Didn't receive the code? `}
          <button
            onClick={handleResendCode}
            className={`text-blue-400 ${
              isLoading || countdown > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading || countdown > 0} // Disable if loading or countdown > 0
          >
            Resend
          </button>
          {countdown > 0 && (
            <span className="text-gray-400">({countdown}s)</span>
          )}
        </p>
      </div>
    </div>
  );
}
