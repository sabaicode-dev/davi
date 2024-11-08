import {
  Controller,
  Get,
  Query,
  Route,
  Tags,
  Res,
  Request,
  TsoaResponse,
} from "tsoa";
import express, { Response } from "express";
import {
  googleSignIn,
  exchangeCodeForTokens,
} from "../services/authGoogle.service";
import { setCookie } from "../utils/cookie";
import { jwtDecode } from "jwt-decode";
import { saveUserToDB } from "../database/services/user.service"; // MongoDB service function to save user data

/**
 * Controller for handling Google authentication.
 */
@Route("/v1/auth")
@Tags("Google Intergrate AWS Cognito")
export class GoogleAuthController extends Controller {
  /**
   * Initiate Google Sign-In
   * @summary Initiates the Google Sign-In process and redirects to Google's authorization page.
   */
  @Get("/google")
  public async initiateGoogleSignIn(
    @Res() redirect: TsoaResponse<302, { url: string }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const signInUrl = googleSignIn();
      redirect(302, { url: signInUrl });
      console.log("Redirecting to Google Sign-In URL:", signInUrl);
    } catch (error: any) {
      console.error("Error initiating Google Sign-In:", error);
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Google Callback
   * @summary Handles the callback from Google with the authorization code.
   * @param code - The authorization code provided by Google.
   * @param req - The Express Request object to access the response.
   * @param errorResponse - Error response in case of a failure.
   */
  @Get("/google/callback")
  public async googleCallback(
    @Query() code: string,
    @Request() request: express.Request,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const response = (request as any).res as Response;

      if (!code) {
        throw new Error("Authorization code not found");
      }

      // Exchange authorization code for tokens
      const tokens = await exchangeCodeForTokens(code);

      // Set tokens in cookies
      setCookie(response, "idToken", tokens.id_token);
      setCookie(response, "accessToken", tokens.access_token);
      setCookie(response, "refreshToken", tokens.refresh_token);

      // Decode the ID token to get user information
      const decodedIdToken: any = jwtDecode(tokens.id_token);

      // Check email verification status
      if (!decodedIdToken.email_verified) {
        throw new Error("Email not verified by Google");
      }
      const username = decodedIdToken.email.split("@")[0];
      // Save or update user data in MongoDB
      try {
        await saveUserToDB({
          username,
          email: decodedIdToken.email,
          cognitoUserId: decodedIdToken.sub,
          confirmed: true,
        });
        console.log("User data saved or updated in MongoDB successfully.");
      } catch (mongoError: any) {
        console.error(
          "Error saving user data to MongoDB:",
          mongoError.message || mongoError
        );
        throw new Error("Failed to save user data to the database.");
      }

      response.status(200).json({
        message: "User authenticated and data saved successfully",
        tokens,
      });
    } catch (error: any) {
      console.error("Error during Google callback:", error.message || error);
      errorResponse(500, { error: error.message || "Internal server error" });
    }
  }

  /**
   * Sign Out
   * @summary Signs out the user by revoking the refresh token and clearing cookies.
   * @param requestBody - Contains the refresh token required for signing out.
   * @param req - The Express Request object to access the response.
   * @param errorResponse - Error response in case of a failure.
   */
  // @Post("/signout")
  // public async handleSignOut(
  //   @Body() requestBody: SignOutRequest,
  //   @Request() request: express.Request,
  //   @Res() errorResponse: TsoaResponse<500, { error: string }>
  // ): Promise<void> {
  //   try {
  //     const response = (request as any).res as Response;
  //     const { refreshToken } = requestBody;

  //     // Validate that the refresh token is present
  //     if (!refreshToken) {
  //       throw new Error("Refresh token not found");
  //     }

  //     // Revoke the refresh token using the service function
  //     await signOut(refreshToken);

  //     // Clear the cookies storing the tokens
  //     response.clearCookie("accessToken");
  //     response.clearCookie("refreshToken");

  //     // Return a successful response after signing out
  //     response.status(200).json({ message: "User signed out successfully" });
  //   } catch (error: any) {
  //     console.error("Error during sign out:", error);
  //     errorResponse(500, { error: error.message });
  //   }
  // }
}

export default GoogleAuthController;
