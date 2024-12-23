// Define request bodies for better type checking and documentation
export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  profile?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface ConfirmSignUpRequest {
  email: string;
  confirmationCode: string;
  password: string;
}
