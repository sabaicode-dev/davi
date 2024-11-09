"use client";
import { useState } from "react";
import { RiEyeCloseFill, RiEyeCloseLine } from "react-icons/ri";

// Define the prop types for LoginForm
interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onGoogleSignUp: () => Promise<void>;
}

export default function LoginForm({
  onSubmit,
  onGoogleSignUp,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onSubmit(email, password).finally(() => setIsLoading(false));
    console.log(email, password);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email or Username
        </label>
        <input
          placeholder="Enter Email"
          id="email"
          name="email"
          type="email"
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            placeholder="Enter Password"
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {isPasswordVisible ? <RiEyeCloseLine /> : <RiEyeCloseFill />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <button
        type="button"
        onClick={onGoogleSignUp}
        className="w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        Sign in with Google
      </button>
    </form>
  );
}
