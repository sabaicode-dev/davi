import { Body, Controller, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
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
      this.setStatus(200); // Set the response status code to 201 (Created)
      return { message: result.message, result: result }; // Ensure we always return 'result' in case of success
    } catch (error: any) {
      console.error("Error during sign-up:", error.message || error);

      let result = {}; // Initialize result to be returned with the error message
      let message = "An error occurred during sign-up."; // Default error message

      if (error.message === "User already exists. Please try logging in.") {
        // Handle user already exists error
        this.setStatus(409); // Conflict (user already exists)
        message = error.message; // Set the message for already existing user
      } else {
        this.setStatus(500); // Internal server error for other cases
      }

      return { message, result }; // Ensure 'result' is always included, even in error cases
    }
  }

  /**
   * Sign in an existing user
   * @param requestBody The user email and password
   */

  // Updated signIn method

  @Post("signin")
  public async signIn(
    @Body() requestBody: SignInRequest,
    @Res()
    sendResponse: TsoaResponse<200 | 401, { message: string; result?: any }>
  ): Promise<void> {
    const { email, password } = requestBody;
    try {
      const result = await signInUser(email, password);

      // Send the response with a status code and cookie
      sendResponse(
        200,
        {
          message: "User signed in successfully",
          result,
        },
        {
          "Set-Cookie": `authToken=${result?.IdToken}; HttpOnly; Secure=${
            process.env.NODE_ENV === "production"
          }; Max-Age=86400; SameSite=Strict`,
        }
      );
    } catch (error: any) {
      sendResponse(401, { message: error.message });
    }
  }
  // @Post("signin")
  // public async signIn(
  //   @Body() requestBody: SignInRequest
  // ): Promise<{ message: string; result: any }> {
  //   const { email, password } = requestBody;
  //   try {
  //     const result = await signInUser(email, password);
  //     return { message: "User signed in successfully", result };
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // }

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
