// Define request bodies for better type checking and documentation
export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface ConfirmSignUpRequest {
  email: string;
  confirmationCode: string;
}

export interface DeleteUserRequest {
  email: string;
}
