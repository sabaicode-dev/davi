"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios"; // Adjust this import path based on your project structure
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EmailVerificationProps {
  email: string;
}

export default function EmailVerification({ email }: EmailVerificationProps) {
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
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      setError("Email is missing. Please try signing up again.");
    }
  }, [email]);

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
      setError("Please enter a 6-digit verification code.");
      return;
    }

    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      // Verify the email with the entered code using backend endpoint
      const response = await axiosInstance.post("/v1/auth/verify-email", {
        email,
        code,
      });

      if (response.status === 200) {
        setSuccess(true);
        router.push("/dashboard"); // Redirect on successful verification
      } else {
        setError("Failed to verify code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Resend verification code for the provided email
      await axiosInstance.post("/v1/auth/resend-code", { email });
      setSuccess(true);
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
              Enter the verification code sent to:{" "}
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
        <p className="mt-4 text-sm text-gray-400">
          {`Didn't receive the code? `}
          <button
            onClick={handleResendCode}
            className="text-blue-400"
            disabled={isLoading}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
