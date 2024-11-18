import { Controller, Get, Route, Tags, Request, Res, TsoaResponse } from "tsoa";
import express from "express";
import UserRepository from "../database/repositories/user.repository";

@Route("/v1/auth")
@Tags("User Management")
export class UserController extends Controller {
  /**
   * Get the logged-in user's profile using `cognitoUserId` from cookies.
   * @returns The `username` and `email` of the user.
   */
  @Get("/me")
  public async getMe(
    @Request() req: express.Request,
    @Res() errorResponse: TsoaResponse<401 | 500, { error: string }>
  ): Promise<{ username: string; email: string; createdAt: string }> {
    try {
      // Extract cognitoUserId from cookies
      const cognitoUserId = req.cookies["cognitoUserId"];
      if (!cognitoUserId) {
        console.error("cognitoUserId cookie not found");
        return errorResponse(401, {
          error: "Unauthorized. No cognitoUserId found in cookies.",
        });
      }

      console.log("cognitoUserId from cookie:", cognitoUserId);

      // Fetch the user by cognitoUserId here
      const user = await UserRepository.getUserByCognitoId(cognitoUserId);
      if (!user) {
        console.error(`No user found for cognitoUserId: ${cognitoUserId}`);
        return errorResponse(401, { error: "User not found." });
      }

      console.log("User found:", user);

      // Convert createdAt to a readable format if it's a Date
      const formattedCreatedAt = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString() // Convert to string if it's a Date
        : "Invalid Date";

      // Return user profile
      return {
        username: user.username,
        email: user.email,
        createdAt: formattedCreatedAt,
      };
    } catch (error) {
      console.error("Error in /v1/auth/me:", error);
      return errorResponse(500, { error: "Internal server error" });
    }
  }
}

export default UserController;
