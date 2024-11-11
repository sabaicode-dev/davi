// src/services/authEmail.service.ts

import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminInitiateAuthCommand,
  ConfirmSignUpCommand,
  RevokeTokenCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from "crypto";
import dotenv from "dotenv";
import UserRepository from "../database/repositories/user.repository"; // Import the repository
import path from "path";

// Specify the path to your .env file
const env = process.env.NODE_ENV || "development";
const envPath =
  env === "production"
    ? path.resolve(__dirname, `./configs/.env.${env}`)
    : path.resolve(__dirname, `../configs/.env.${env}`);

dotenv.config({ path: envPath });

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION,
});

// Helper function to generate the secret hash
const generateSecretHash = (
  username: string,
  clientId: string,
  clientSecret: string
): string => {
  return crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
};

export const signUpUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const clientId = process.env.AWS_COGNITO_CLIENT_ID!;
    const clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET!;
    const secretHash = generateSecretHash(email, clientId, clientSecret);

    console.log(`clientId : ${clientId}`);

    const command = new SignUpCommand({
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "name", Value: username },
      ],
      SecretHash: secretHash,
    });

    const response = await cognitoClient.send(command);

    if (response.UserSub) {
      await UserRepository.createUser(username, email, response.UserSub, false);
    }

    return response;
  } catch (error: any) {
    console.error("Error signing up user:", error.message || error);
    throw error;
  }
};

// Function to sign in an existing user
export const signInUser = async (email: string, password: string) => {
  try {
    const clientId = process.env.AWS_COGNITO_CLIENT_ID!;
    const clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET!;
    const secretHash = generateSecretHash(email, clientId, clientSecret);

    const command = new AdminInitiateAuthCommand({
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });

    const response = await cognitoClient.send(command);
    return response.AuthenticationResult;
  } catch (error: any) {
    console.error("Error signing in user: ", error.message || error);
    throw error;
  }
};

// Function to confirm a user's sign-up
export const confirmSignUp = async (
  email: string,
  confirmationCode: string
) => {
  try {
    const clientId = process.env.AWS_COGNITO_CLIENT_ID!;
    const clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET!;
    const secretHash = generateSecretHash(email, clientId, clientSecret);

    const command = new ConfirmSignUpCommand({
      ClientId: clientId,
      Username: email,
      ConfirmationCode: confirmationCode,
      SecretHash: secretHash,
    });

    const response = await cognitoClient.send(command);

    // Update user to confirmed status in MongoDB
    await UserRepository.confirmUser(email);

    return response;
  } catch (error: any) {
    console.error("Error confirming sign-up: ", error.message || error);
    throw error;
  }
};

// Function to log out a user by revoking their refresh token
export const logoutUser = async (refreshToken: string) => {
  try {
    const clientId = process.env.AWS_COGNITO_CLIENT_ID!;
    if (!clientId) {
      throw new Error(
        "AWS_COGNITO_CLIENT_ID is missing from environment variables."
      );
    }

    const clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET!;

    // console.log(`Using ClientId: ${clientId} to revoke token ${refreshToken}.`);

    const command = new RevokeTokenCommand({
      ClientId: clientId,
      Token: refreshToken,
      ClientSecret: clientSecret,
    });

    const response = await cognitoClient.send(command);
    return { message: "Token revoked successfully", response };
  } catch (error: any) {
    console.error(
      "Error logging out user (revoking token failed):",
      JSON.stringify(error, null, 2)
    );
    throw error;
  }
};
