import {
  Body,
  Controller,
  Put,
  Route,
  Tags,
  TsoaResponse,
  Request,
  Res,
} from "tsoa";
import express, { Response } from "express";
import UserRepository from "../database/repositories/user.repository";
// import { SignOutRequest } from "./types/signOut.type";
import { logoutUser } from "../services/authEmail.service";

@Route("/v1/auth")
@Tags("Update and Logout")
export class UpdateUserName extends Controller {
  /**
   * Update username of an existing user
   */
  @Put("updateUsername")
  public async updateUsername(
    @Body() requestBody: { email: string; newUsername: string }
  ): Promise<{ message: string; result: any }> {
    const { email, newUsername } = requestBody;
    try {
      const result = await UserRepository.updateUsername(email, newUsername);
      return { message: "Username updated successfully", result };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Unified logout function to handle user sign out and clear tokens
   */
  @Put("logout")
  public async unifiedLogout(
    @Request() request: express.Request,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<{ message: string } | void> {
    try {
      console.log("call in logout");

      const { accessToken } = request.cookies;

      console.log("accessToken", accessToken);

      const response = (request as any).res as Response;
      const clearCookie = (name: string) => {
        response.cookie(name, "", {
          expires: new Date(0),
          httpOnly: true,
        });
      };

      // Revoke the refresh token using the service function
      // await logoutUser(refreshToken, accessToken, idToken, cognitoUserId);
      console.log("called 0");

      await logoutUser({ accessToken });

      console.log("called 1");

      // Clear the cookies storing the tokens
      clearCookie("refreshToken");
      clearCookie("accessToken");
      clearCookie("idToken");
      clearCookie("cognitoUserId");

      console.log("called 2");

      // Return a successful JSON response
      return { message: "User logged out successfully" };
    } catch (error: any) {
      console.error("Error during sign out:", error);
      return errorResponse(500, {
        error: error.message || "Failed to log out user",
      });
    }
  }
}
