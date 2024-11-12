import { Body, Controller, Put, Route, Tags } from "tsoa";
import UserRepository from "../database/repositories/user.repository";
@Route("/v1/auth")
@Tags("Update UserName")
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
}
