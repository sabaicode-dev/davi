import { Body, Controller, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { Response } from "express";
import {
  signUpUser,
  signInUser,
  confirmSignUp,
  resendConfirmationCode,
} from "../services/authEmail.service";
import {
  ConfirmSignUpRequest,
  SignInRequest,
  SignUpRequest,
} from "./types/authEmail.type";
import { setCookie } from "../utils/cookie";

@Route("/v1/auth")
@Tags("Email Integrate AWS Cognito")
export class CognitoController extends Controller {
  /**
   * Sign up a new user.
   * @param requestBody - The user email and password.
   */
  @Post("signup")
  public async signUp(
    @Body() requestBody: SignUpRequest
  ): Promise<{ message: string; result: any }> {
    const { username, email, password } = requestBody;
    try {
      const result = await signUpUser(username, email, password);
      this.setStatus(200);
      return { message: result.message, result };
    } catch (error: any) {
      console.error("Sign-up error:", error.message || error);
      this.setStatus(error.message === "User already exists." ? 409 : 500);
      return {
        message: error.message || "An error occurred during sign-up.",
        result: {},
      };
    }
  }

  /**
   * Sign in an existing user.
   * @param requestBody - The user email and password.
   */
  @Post("signin")
  public async signIn(
    @Body() requestBody: SignInRequest,
    @Res() successResponse: TsoaResponse<200, { message: string; result: any }>,
    @Res() errorResponse: TsoaResponse<401, { message: string }>
  ): Promise<void> {
    const { email, password } = requestBody;

    try {
      const result = await signInUser(email, password);

      if (!result?.IdToken || !result?.RefreshToken) {
        errorResponse(401, { message: "Authentication tokens are missing" });
        return;
      }

      // Mock Express Response object for `setCookie`
      const mockResponse = {
        cookie: (name: string, value: string, options: any) => {
          console.log(`Setting cookie: ${name}=${value}, options:`, options);
        },
      } as unknown as Response;

      // Set cookies using the utility
      setCookie(mockResponse, "authToken", result.IdToken, {
        maxAge: 3600 * 1000,
      }); // 1 hour
      setCookie(mockResponse, "refreshToken", result.RefreshToken, {
        maxAge: 604800 * 1000,
      }); // 7 days

      // Return success response
      successResponse(200, {
        message: "User signed in successfully",
        result: { IdToken: result.IdToken, RefreshToken: result.RefreshToken },
      });
    } catch (error: any) {
      errorResponse(401, { message: error.message });
    }
  }
  /**
   * Confirm user sign-up.
   * @param requestBody - The user email and confirmation code.
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
      const isCodeError =
        error.message.includes("ExpiredCodeException") ||
        error.message.includes("CodeMismatchException");

      throw new Error(
        isCodeError
          ? "The confirmation code is invalid or has expired. Please request a new code."
          : error.message
      );
    }
  }

  /**
   * Resend the confirmation code to a user's email.
   * @param requestBody - The user's email.
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
