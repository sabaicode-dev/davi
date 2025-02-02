import User, { IUser } from "../database/models/user.models";
import * as AWS from "aws-sdk";
import configs from "../config";
import Admin, { IAdmin } from "../database/models/adminRole.model";

// Set the AWS region
AWS.config.update({ region: configs.awsCognitoRegion || "us-east-1" });

const awsCognitoUserPoolId = configs.awsCognitoUserPoolId;
const cognito = new AWS.CognitoIdentityServiceProvider();

// Get all users from AWS Cognito
export const listUsersCognito = async () => {
  const params = {
    UserPoolId: awsCognitoUserPoolId,
  };

  try {
    const result = await cognito.listUsers(params).promise();
    return result.Users;
  } catch (error: any) {
    throw new Error(`Error fetching users from Cognito: ${error.message}`);
  }
};

// Get a user from AWS Cognito by username
export const getUserCognitoByUserName = async (username: string) => {
  const params = {
    UserPoolId: awsCognitoUserPoolId,
    Username: username,
  };

  try {
    // Use `adminGetUser` to fetch user information
    const result = await cognito.adminGetUser(params).promise();
    return result;
  } catch (error: any) {
    throw new Error(`Error fetching user from Cognito: ${error.message}`);
  }
};

// Delete a user from AWS Cognito
export const deleteUserCognito = async (username: string) => {
  const params = {
    UserPoolId: awsCognitoUserPoolId,
    Username: username,
  };

  try {
    const result = await cognito.adminDeleteUser(params).promise();
    return result;
  } catch (error: any) {
    throw new Error(`Error deleting user from Cognito: ${error.message}`);
  }
};

// Delete a user from AWS Cognito by email
export const cognitoDeleteUserByEmail = async (email: string) => {
  try {
    // List all users and filter by email
    const users = await listUsersCognito();
    const user = users!.find((u) =>
      u.Attributes!.some(
        (attr) => attr.Name === "email" && attr.Value === email
      )
    );

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    // Extract the username and delete the user
    const username = user.Username;
    await deleteUserCognito(username!);

    return `User with email ${email} deleted successfully`;
  } catch (error: any) {
    throw new Error(`Error deleting user by email: ${error.message}`);
  }
};

// Delete all users from AWS Cognito
export const cognitoDeleteAllUsers = async () => {
  try {
    // List users from Cognito (you might need pagination depending on the number of users)
    const users = await listUsersCognito();

    // Deleting users one by one
    for (const user of users!) {
      const username = user.Username;
      await deleteUserCognito(username!); // Delete user by username
    }

    return `All users deleted successfully`;
  } catch (error: any) {
    throw new Error(`Error deleting all users from Cognito: ${error.message}`);
  }
};

// Service: Get all users from the database
export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error: any) {
    throw new Error(`Error fetching users from database: ${error.message}`);
  }
};

// Service: Get user by ID from the database
export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error: any) {
    throw new Error(
      `Error fetching user by ID from database: ${error.message}`
    );
  }
};

// Service: Get user by ID from the database
export const getUserByCognitoId = async (id: string) => {
  try {
    const user = await User.findOne({ cognitoUserId: id });
    return user;
  } catch (error: any) {
    throw new Error(
      `Error fetching user by ID from database: ${error.message}`
    );
  }
};

// Service: Create a new user in the database
export const createUser = async (userData: Partial<IUser>) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user in database: ${error.message}`);
  }
};

// Service: Update user details in the database
export const updateUser = async (id: string, updateData: Partial<IUser>) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    return user;
  } catch (error: any) {
    throw new Error(`Error updating user in database: ${error.message}`);
  }
};

// Service: Delete a user from the database
export const deleteUser = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error: any) {
    throw new Error(`Error deleting user from database: ${error.message}`);
  }
};

// Delete all users from the database
export const deleteAllUsers = async () => {
  try {
    const result = await User.deleteMany({});
    return result;
  } catch (error: any) {
    throw new Error(`Error deleting all users: ${error.message}`);
  }
};

// Service: Get all admin from the database
export const getAllAdmin = async () => {
  try {
    const admins = await Admin.find();
    return admins;
  } catch (error: any) {
    throw new Error(`Error fetching admins from database: ${error.message}`);
  }
};

// Service: Create a new admin in th database
export const createAdmin = async (adminData: Partial<IAdmin>) => {
  try {
    const admin = new Admin(adminData);
    await admin.save();
    return admin;
  } catch (error: any) {
    throw new Error(`Error creating admin in database: ${error.message}`);
  }
};

// Service: Delete an admin from the database
export const deleteAdmin = async (adminId: string) => {
  try {
    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  } catch (error: any) {
    throw new Error(`Error deleting admin from database: ${error.message}`);
  }
};
