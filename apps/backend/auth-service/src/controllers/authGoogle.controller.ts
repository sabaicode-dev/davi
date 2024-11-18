import {
  Controller,
  Get,
  Query,
  Route,
  Tags,
  Res,
  Request,
  TsoaResponse,
  Post,
  Body,
} from "tsoa";
import express, { Response } from "express";
import {
  googleSignIn,
  exchangeCodeForTokens,
  exchangeRefreshTokenForNewTokens, // Assuming a function that exchanges refresh token
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

      // Set tokens in cookies or handle them as needed
      const response = (request as any).res as Response;
      setCookie(response, "idToken", tokens.id_token);
      setCookie(response, "accessToken", tokens.access_token);
      setCookie(response, "refreshToken", tokens.refresh_token);

      // Decode the ID token to get user information
      const decodedIdToken: any = jwtDecode(tokens.id_token);
      if (!decodedIdToken.email_verified) {
        throw new Error("Email not verified by Google");
      }

      // You can save the user in MongoDB here or take any further action
      const username = decodedIdToken.email.split("@")[0];
      await saveUserToDB({
        username,
        email: decodedIdToken.email,
        cognitoUserId: decodedIdToken.sub,
        confirmed: true,
      });

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
   * Refresh Token
   * @summary Exchanges a valid refresh token for a new set of access and ID tokens.
   * @param refreshToken - The refresh token to exchange.
   * @param req - The Express Request object.
   * @param errorResponse - Error response in case of failure.
   */
  @Post("/refresh-token")
  public async refreshToken(
    @Body() body: { refreshToken: string },
    @Request() request: express.Request,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      if (!body.refreshToken) {
        throw new Error("Refresh token is required");
      }

      // Exchange the refresh token for new tokens
      const newTokens = await exchangeRefreshTokenForNewTokens(
        body.refreshToken
      );

      if (!newTokens.access_token || !newTokens.id_token) {
        throw new Error("Failed to refresh tokens");
      }

      // Set new tokens in cookies
      const response = (request as any).res as Response;
      setCookie(response, "idToken", newTokens.id_token);
      setCookie(response, "accessToken", newTokens.access_token);
      setCookie(response, "refreshToken", newTokens.refresh_token);

      // Respond with the new tokens
      response.status(200).json({
        message: "Tokens refreshed successfully",
        tokens: newTokens,
      });
    } catch (error: any) {
      console.error("Error refreshing tokens:", error.message || error);
      errorResponse(500, { error: error.message || "Internal server error" });
    }
  }
}

export default GoogleAuthController;
