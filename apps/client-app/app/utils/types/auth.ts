// src/utils/types/auth.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface VerifyUserRequest {
  email: string;
  code: string;
}
