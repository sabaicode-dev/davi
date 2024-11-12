import { Body, Controller, Post, Route, Tags } from "tsoa";
import {
  signUpUser,
  signInUser,
  confirmSignUp,
  resendConfirmationCode, // Import the resend function
} from "../services/authEmail.service";

import {
  ConfirmSignUpRequest,
  SignInRequest,
  SignUpRequest,
} from "./types/authEmail.type";

@Route("/v1/auth") // Define the base route for the controller
@Tags("Email Integrate AWS Cognito")
export class CognitoController extends Controller {
  /**
   * Sign up a new user
   * @param requestBody The user email and password
   */
  @Post("signup")
  public async signUp(
    @Body() requestBody: SignUpRequest
  ): Promise<{ message: string; result: any }> {
    const { username, email, password } = requestBody;
    try {
      const result = await signUpUser(username, email, password);
      this.setStatus(200); // Set the response status code to 201
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
      // Check for specific error codes
      if (
        error.message.includes("ExpiredCodeException") ||
        error.message.includes("CodeMismatchException")
      ) {
        throw new Error(
          "The confirmation code is invalid or has expired. Please request a new code and try again."
        );
      }
      // Handle other errors
      throw new Error(error.message);
    }
  }

  // @Post("confirm")
  // public async confirmSignUp(
  //   @Body() requestBody: ConfirmSignUpRequest
  // ): Promise<{ message: string; result: any }> {
  //   const { email, confirmationCode } = requestBody;
  //   try {
  //     const result = await confirmSignUp(email, confirmationCode);
  //     return { message: "User confirmed successfully", result };
  //   } catch (error: any) {
  //     if (
  //       error.message.includes("ExpiredCodeException") ||
  //       error.message.includes("CodeMismatchException")
  //     ) {
  //       throw new Error(
  //         "The confirmation code is invalid or expired. Please request a new code."
  //       );
  //     }
  //     throw new Error(error.message);
  //   }
  // }

  /**
   * Resend the confirmation code to a user's email
   * @param requestBody The user's email
   */
  @Post("resend-code")
  public async resendCode(
    @Body() requestBody: { email: string }
  ): Promise<{ message: string }> {
    const { email } = requestBody;
    try {
      const result = await resendConfirmationCode(email);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default CognitoController;
