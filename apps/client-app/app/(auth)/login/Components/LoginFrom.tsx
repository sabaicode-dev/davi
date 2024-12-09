"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/app/schema/Login"; // Import the login schema
import { RiEyeCloseFill, RiEyeCloseLine } from "react-icons/ri";
import { z } from "zod";

// Define the prop types for LoginForm
interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

// Define the schema type for TypeScript
type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Initialize useForm with zodResolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema), // Use zod schema for validation
  });

  // Toggle password visibility
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  // Handle form submission
  const handleFormSubmit = async (data: LoginFormData) => {
    await onSubmit(data.email, data.password);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Email input field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("email")}
        />
        {/* Show email validation error message */}
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password input field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter Password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("password")}
          />
          {/* Toggle password visibility */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {isPasswordVisible ? <RiEyeCloseLine /> : <RiEyeCloseFill />}
          </button>
          {/* Show password validation error message */}
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
