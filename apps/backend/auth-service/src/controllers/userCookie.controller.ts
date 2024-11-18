import { Controller, Get, Route, Tags, Request, Res, TsoaResponse } from "tsoa";
import express from "express";
import UserRepository from "../database/repositories/user.repository";
import { verifyToken } from "@/src/utils/auth";

interface JwtPayload {
  email: string;
  username?: string;
}

@Route("/v1/auth")
@Tags("User Management")
export class UserController extends Controller {
  /**
   * Get logged-in user details
   * @returns The username and email of the authenticated user.
   */
  @Get("/me")
  public async getUserDetails(
    @Request() req: express.Request,
    @Res() errorResponse: TsoaResponse<401, { error: string }>
  ): Promise<{ username: string; email: string }> {
    try {
      const authToken = req.cookies["authToken"]; // Or retrieve from headers
      if (!authToken) {
        errorResponse(401, { error: "Unauthorized. No auth token provided." });
        return {} as { username: string; email: string };
      }

      const decodedToken: JwtPayload = verifyToken(authToken);
      const email = decodedToken.email;

      // Use UserRepository to fetch user details
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        errorResponse(401, { error: "User not found." });
        return {} as { username: string; email: string };
      }

      return { username: user.username, email: user.email };
    } catch (error) {
      console.error("Error in fetching user details:", error);
      throw new Error("An error occurred while fetching user details.");
    }
  }
}
