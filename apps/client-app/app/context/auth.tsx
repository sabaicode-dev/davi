// src/context/auth.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import axiosInstance from "@/app/utils/axios";
import { API_ENDPOINT } from "@/app/utils/const/apiEndpoint";
import { LoginRequest, SignupRequest } from "@/app/utils/types/auth";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (credentials: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  signinWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginRequest) => {
    await axiosInstance.post(API_ENDPOINT.SIGN_IN, credentials);
    const { data } = await axiosInstance.get(API_ENDPOINT.USER_PROFILE);
    setUser(data);
    router.push("/dashboard");
  };

  const signup = async (credentials: SignupRequest) => {
    await axiosInstance.post(API_ENDPOINT.SIGN_UP, credentials);
    router.push(`/verify?email=${credentials.email}`);
  };

  const logout = async () => {
    await axiosInstance.post(API_ENDPOINT.SIGN_OUT);
    setUser(null);
    router.push("/login");
  };

  const signinWithGoogle = async () => {
    const { data } = await axiosInstance.get(API_ENDPOINT.SIGN_IN_WITH_GOOGLE);
    window.location.href = data.url;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, signinWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
