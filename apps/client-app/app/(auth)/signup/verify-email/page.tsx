"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

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
      // If the current input is empty, move to the previous input
      if (index > 0) {
        const prevInput = document.getElementById(
          `code-${index - 1}`
        ) as HTMLInputElement;
        if (prevInput) prevInput.focus();

        const newCode = [...verificationCode];
        newCode[index - 1] = ""; // Clear the previous input
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

    try {
      // Simulate API call for code verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError("Failed to verify code. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="grid gird-col h-screen place-content-center w-full">
      <div className="max-w-screen-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 flex justify-center items-center">
          <Image
            src="/images/auth-images/verify.png"
            width={200}
            height={200}
            alt="Picture of the author"
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
              Enter verification code:{" "}
              <span className="underline">sophearum14@gmail.com</span>
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
            onClick={() => router.push('http://localhost:8080')}
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verify
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400">
          {`Don't receive the code? `}
          <button className="text-blue-400">Resend</button>
        </p>
      </div>
    </div>
  );
}
