import { Body, Controller, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import {
  signUpUser,
  signInUser,
  confirmSignUp,
  resendConfirmationCode, // Import the resend function
} from "../services/authEmail.service";
import jwt from "jsonwebtoken";
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
  @Post("signin")
  public async signIn(
    @Body() requestBody: SignInRequest,
    @Res()
    successResponse: TsoaResponse<
      200,
      { message: string; result: any },
      { "Set-Cookie": string[] }
    >,
    @Res()
    errorResponse: TsoaResponse<401, { message: string }>
  ): Promise<void> {
    const { email, password } = requestBody;
    try {
      const result = await signInUser(email, password);

      if (!result?.IdToken || !result?.RefreshToken || !result?.AccessToken) {
        errorResponse(401, { message: "Authentication tokens are missing" });
        return;
      }

      // Decode the IdToken to extract cognitoUserId
      const decodedToken = jwt.decode(result.IdToken) as { sub?: string };
      const cognitoUserId = decodedToken?.sub; // 'sub' is typically the user ID

      if (!cognitoUserId) {
        errorResponse(401, { message: "Unable to retrieve user ID" });
        return;
      }

      const cookies = [
        `idToken=${result.IdToken}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict`,
        `refreshToken=${result.RefreshToken}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict`,
        `accessToken=${result.AccessToken}; HttpOnly; Secure; Max-Age=3600; SameSite=Strict`,
        `cognitoUserId=${cognitoUserId}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict`,
      ];

      successResponse(
        200,
        {
          message: "User signed in successfully",
          result: {
            IdToken: result.IdToken,
            RefreshToken: result.RefreshToken,
            AccessToken: result.AccessToken,
            cognitoUserId,
          },
        },
        { "Set-Cookie": cookies }
      );
    } catch (error: any) {
      console.error("Sign-in error:", error.message || error);
      errorResponse(401, { message: error.message || "Sign-in failed." });
    }
  }

  /**
   * Confirm user sign up
   * @param requestBody The user email and confirmation code
   */
  @Post("confirm")
  public async confirmSignUp(
    @Body() requestBody: ConfirmSignUpRequest,
    @Res()
    successResponse: TsoaResponse<
      200,
      { message: string; result: any },
      { "Set-Cookie": string[] }
    >,
    @Res()
    errorResponse: TsoaResponse<400 | 401, { message: string }>
  ): Promise<void> {
    const { email, confirmationCode, password } = requestBody;
    try {
      // Confirm the user's sign-up (omit the unused variable)
      await confirmSignUp(email, confirmationCode);

      // Automatically sign in the user after confirmation
      const signInResult = await signInUser(email, password);

      if (
        !signInResult?.IdToken ||
        !signInResult?.RefreshToken ||
        !signInResult?.AccessToken
      ) {
        errorResponse(401, { message: "Authentication tokens are missing" });
        return;
      }

      // Decode the IdToken to extract cognitoUserId
      const decodedToken = jwt.decode(signInResult.IdToken) as { sub?: string };
      const cognitoUserId = decodedToken?.sub;

      if (!cognitoUserId) {
        errorResponse(401, { message: "Unable to retrieve user ID" });
        return;
      }
      console.log(
        `-----------------------> Sign-UP with Email <------------------------------`
      );
      console.log(`signInResult : ${signInResult}`);
      console.log(`decodedToken : ${decodedToken}`);
      console.log(`cognitoUserId : ${cognitoUserId}`);
      console.log(`----------------------------------------------------------`);
      // Set cookies with authentication tokens
      const cookies = [
        `idToken=${signInResult.IdToken}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict`,
        `refreshToken=${signInResult.RefreshToken}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict`,
        `accessToken=${signInResult.AccessToken}; HttpOnly; Secure; Max-Age=3600; SameSite=Strict`,
        `cognitoUserId=${cognitoUserId}; HttpOnly; Secure; Max-Age=86400; SameSite=Strict`,
      ];

      // Send the response with cookies
      successResponse(
        200,
        {
          message: "User confirmed and signed in successfully",
          result: {
            IdToken: signInResult.IdToken,
            RefreshToken: signInResult.RefreshToken,
            AccessToken: signInResult.AccessToken,
            cognitoUserId,
          },
        },
        { "Set-Cookie": cookies }
      );
    } catch (error: any) {
      console.error(
        "Error during confirmation and sign-in:",
        error.message || error
      );

      if (
        error.message.includes("ExpiredCodeException") ||
        error.message.includes("CodeMismatchException")
      ) {
        errorResponse(400, {
          message:
            "The confirmation code is invalid or has expired. Please request a new code and try again.",
        });
      } else {
        errorResponse(400, {
          message: error.message || "Confirmation failed.",
        });
      }
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
  //     // Check for specific error codes
  //     if (
  //       error.message.includes("ExpiredCodeException") ||
  //       error.message.includes("CodeMismatchException")
  //     ) {
  //       throw new Error(
  //         "The confirmation code is invalid or has expired. Please request a new code and try again."
  //       );
  //     }
  //     // Handle other errors
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
