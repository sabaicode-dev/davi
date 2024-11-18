import {
  Controller,
  Get,
  Query,
  Route,
  Tags,
  Res,
  TsoaResponse,
  Request,
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
    @Res() redirect: TsoaResponse<200, { url: string }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const signInUrl = googleSignIn();
      console.log("Redirecting to Google Sign-In URL:", signInUrl);
      // Send a 302 redirect to the frontend with the URL
      redirect(200, { url: signInUrl });
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
      if (!code) {
        throw new Error("Authorization code not found");
      }

      // Exchange authorization code for tokens
      const tokens = await exchangeCodeForTokens(code);

      // Access the Express Response object
      const response = (request as any).res as Response;

      // Decode the ID token to extract user information
      const decodedIdToken: any = jwtDecode(tokens.id_token);

      if (!decodedIdToken.email_verified) {
        throw new Error("Email not verified by Google");
      }

      // Extract cognitoUserId from ID token
      const cognitoUserId = decodedIdToken.sub;

      // Save the user in MongoDB or another database
      const username = decodedIdToken.email.split("@")[0];
      await saveUserToDB({
        username,
        email: decodedIdToken.email,
        cognitoUserId,
        confirmed: true,
      });

      // Set cookies securely for tokens and cognitoUserId
      setCookie(response, "idToken", tokens.id_token);
      setCookie(response, "accessToken", tokens.access_token);
      setCookie(response, "refreshToken", tokens.refresh_token);
      setCookie(response, "cognitoUserId", cognitoUserId);

      // Respond with success
      response.status(200).json({
        message: "User authenticated and data saved successfully",
        tokens,
        cognitoUserId,
      });
    } catch (error: any) {
      console.error("Error during Google callback:", error.message || error);
      errorResponse(500, { error: error.message || "Internal server error" });
    }
  }
}

export default GoogleAuthController;
