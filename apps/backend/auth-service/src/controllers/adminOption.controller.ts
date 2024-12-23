import {
  Controller,
  Post,
  Body,
  Route,
  Tags,
  Res,
  TsoaResponse,
  Get,
  Path,
  Put,
  Delete,
} from "tsoa";
import * as userService from "../services/adminOption.service";

/**
 * Admin User Management Controller
 */
@Route("v1/auth/admin/")
@Tags("Admin Management")
export class AdminController extends Controller {
  /**
   * Create a new admin in the database
   */
  @Post("database/createAdmin/")
  public async createAdmin(
    @Body()
    body: {
      username: string;
      email: string;
      password?: string;
      profile?: string;
    },
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const admin = await userService.createAdmin(body);
      response(200, { message: "Admin created successfully", data: admin });
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Get all admins from the database
   */
  @Get("database/getAllAdmins/")
  public async getAllAdmin(
    @Res()
    response: TsoaResponse<200, { message: string; data: any; total: number }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const admins = await userService.getAllAdmin();
      const total = admins.length;
      response(200, {
        message: "Admins fetched successfully",
        data: admins,
        total,
      });
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Delete an admin from the database
   */
  @Delete("database/deleteAdmin/{adminId}")
  public async deleteAdmin(
    adminId: string,
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<404, { error: string }>,
    @Res() serverErrorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const admin = await userService.deleteAdmin(adminId);
      response(200, { message: "Admin deleted successfully", data: admin });
    } catch (error: any) {
      if (error.message === "Admin not found") {
        errorResponse(404, { error: error.message });
      } else {
        serverErrorResponse(500, { error: error.message });
      }
    }
  }
}

@Route("v1/auth/adminOptions/")
@Tags("Admin Options")
export class AdminOptionController extends Controller {
  /**
   * Get all users from the database
   */
  @Get("database/getAllUsers/")
  public async getAllUsers(
    @Res()
    response: TsoaResponse<200, { message: string; data: any; total: number }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      const total = users.length;
      response(200, {
        message: "Users fetched successfully",
        data: users,
        total,
      });
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Get a user by ID from the database
   */
  @Get("database/getUserById/{id}")
  public async getUserById(
    @Path() id: string,
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500 | 404, { error: string }>
  ): Promise<void> {
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        errorResponse(404, { error: "User not found" });
      } else {
        response(200, { message: "User fetched successfully", data: user });
      }
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Create a new user in the database
   */
  @Post("database/createUser/")
  public async createUser(
    @Body()
    body: {
      username: string;
      email: string;
      password?: string;
      profile?: string;
    },
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const user = await userService.createUser(body);
      response(200, { message: "User created successfully", data: user });
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Update a user in the database
   */
  @Put("database/updateUser/{id}")
  public async updateUser(
    @Path() id: string,
    @Body() body: { username?: string; email?: string; profile?: string },
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500 | 404, { error: string }>
  ): Promise<void> {
    try {
      const user = await userService.updateUser(id, body);
      if (!user) {
        errorResponse(404, { error: "User not found" });
      } else {
        response(200, { message: "User updated successfully", data: user });
      }
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Delete a user from the database
   */
  @Post("database/delete-user/{id}")
  public async deleteUser(
    @Path() id: string,
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500 | 404, { error: string }>
  ): Promise<void> {
    try {
      const user = await userService.deleteUser(id);
      if (!user) {
        errorResponse(404, { error: "User not found" });
      } else {
        response(200, { message: "User deleted successfully", data: user });
      }
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Delete all users from the database
   */
  @Post("database/delete-all-users")
  public async deleteAllUsers(
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const result = await userService.deleteAllUsers();
      response(200, {
        message: "All users deleted successfully",
        data: result,
      });
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * List all users from the Cognito
   */
  @Get("cognito/listUsersCognito/")
  public async listUsersCognito(
    @Res()
    response: TsoaResponse<200, { message: string; data: any; total: number }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      const users = await userService.listUsersCognito();
      const total = users!.length;
      response(200, {
        message: "Users fetched successfully",
        data: users,
        total,
      });
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Get a user from Cognito by username
   */
  @Get("cognito/getUsersCognito/{id}")
  public async getUserCognitoByUserName(
    @Path() id: string,
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500 | 404, { error: string }>
  ): Promise<void> {
    try {
      const user = await userService.getUserCognitoByUserName(id);
      if (!user) {
        errorResponse(404, { error: "User not found" });
      } else {
        response(200, { message: "User fetched successfully", data: user });
      }
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Delete a user from the Cognito
   */
  @Post("cognito/delete-user/{id}")
  public async deleteUserCognito(
    @Path() id: string,
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500 | 404, { error: string }>
  ): Promise<void> {
    try {
      const user = await userService.deleteUserCognito(id);
      if (!user) {
        errorResponse(404, { error: "User not found" });
      } else {
        response(200, { message: "User deleted successfully", data: user });
      }
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Delete a user from Cognito by email
   */
  @Delete("cognito/delete-user/:email") // Delete route for user by email
  public async cognitoDeleteUserByEmail(
    @Path() email: string,
    @Res() response: TsoaResponse<200, { message: string; data: any }>,
    @Res() errorResponse: TsoaResponse<500 | 404, { error: string }>
  ): Promise<void> {
    try {
      const user = await userService.cognitoDeleteUserByEmail(email);
      if (!user) {
        errorResponse(404, { error: "User not found" });
      } else {
        response(200, { message: "User deleted successfully", data: user });
      }
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }

  /**
   * Delete all users from Cognito
   */
  @Delete("cognito/delete-all-users") // Delete all users route
  public async cognitoDeleteAllUsers(
    @Res() response: TsoaResponse<200, { message: string }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<void> {
    try {
      await userService.cognitoDeleteAllUsers();
      response(200, { message: "All users deleted successfully" });
    } catch (error: any) {
      errorResponse(500, { error: error.message });
    }
  }
}
