// src/controllers/auth-aws.controller.ts

import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import {
  signUpUser,
  signInUser,
  confirmSignUp,
  logoutUser,
} from "../services/authEmail.service";
import {
  ConfirmSignUpRequest,
  SignInRequest,
  SignUpRequest,
} from "./types/authEmail.type";
import { SignOutRequest } from "./types/google-request.type";

@Route("/v1/auth") // Define the base route for the controller
@Tags("Email Intergrate AWS Cognito")
export class CognitoController extends Controller {
  /**
   * Sign up a new user
   * @param requestBody The user email and password
   */
  @SuccessResponse("201", "User signed up successfully") // Custom success response
  @Post("signup")
  public async signUp(
    @Body() requestBody: SignUpRequest
  ): Promise<{ message: string; result: any }> {
    const { email, password } = requestBody;
    try {
      const result = await signUpUser(email, password);
      this.setStatus(201); // Set the response status code to 201
      return { message: "User signed up successfully", result };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Sign in an existing user
   * @param requestBody The user email and password
   */
  @Post("signin")
  public async signIn(
    @Body() requestBody: SignInRequest
  ): Promise<{ message: string; result: any }> {
    const { email, password } = requestBody;
    try {
      const result = await signInUser(email, password);
      return { message: "User signed in successfully", result };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Confirm user sign up
   * @param requestBody The user email and confirmation code
   */
  @Post("confirm")
  public async confirmSignUp(
    @Body() requestBody: ConfirmSignUpRequest
  ): Promise<{ message: string; result: any }> {
    const { email, confirmationCode } = requestBody;
    try {
      const result = await confirmSignUp(email, confirmationCode);
      return { message: "User confirmed successfully", result };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Post("logout")
  public async logout(
    @Body() requestBody: SignOutRequest
  ): Promise<{ message: string; result?: any }> {
    const { refreshToken } = requestBody;
    try {
      const result = await logoutUser(refreshToken);
      return { message: "User logged out successfully", result };
    } catch (error: any) {
      // Return detailed error message
      // console.error("Error logging out user:", JSON.stringify(error, null, 2));
      this.setStatus(500);
      return {
        message: "Failed to log out user",
        result: error.message || error,
      };
    }
  }
}

export default CognitoController;
