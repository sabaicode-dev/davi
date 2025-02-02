import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminInitiateAuthCommand,
  ConfirmSignUpCommand,
  // RevokeTokenCommand,
  ResendConfirmationCodeCommand,
  GlobalSignOutCommandInput,
  GlobalSignOutCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from "crypto";
import UserRepository from "../database/repositories/user.repository"; // Import the repository
import configs from "../config";
import chalk from "chalk";

// call config env url
const AWS_COGNITO_REGION = configs.awsCognitoRegion;
const AWS_COGNITO_CLIENT_ID = configs.awsCognitoClientId;
const AWS_COGNITO_CLIENT_SECRET = configs.awsCognitoClientSecret;
const AWS_COGNITO_USER_POOL_ID = configs.awsCognitoUserPoolId;

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: AWS_COGNITO_REGION,
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
  password: string,
  profile: string
) => {
  try {
    const clientId = AWS_COGNITO_CLIENT_ID!;
    const clientSecret = AWS_COGNITO_CLIENT_SECRET!;
    const secretHash = generateSecretHash(email, clientId, clientSecret);

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
      await UserRepository.createUser(
        username,
        email,
        response.UserSub,
        profile,
        false
      );
    }

    // Return relevant data or result
    return {
      message:
        "User signed up successfully. Please check your email to confirm your account.",
    };
  } catch (error: any) {
    const message = error.message || "An error occurred during sign-up."
    // Handle specific error for user already existing
    if (error.code === "UsernameExistsException") {
      throw new Error("User already exists. Please try logging in.");
    }

    console.error("Error signing up user:", error.message || error);
    throw new Error(message);
  }
};

// Function to sign in an existing user
export const signInUser = async (email: string, password: string) => {
  try {
    const clientId = AWS_COGNITO_CLIENT_ID!;
    const clientSecret = AWS_COGNITO_CLIENT_SECRET!;
    const secretHash = generateSecretHash(email, clientId, clientSecret);

    const command = new AdminInitiateAuthCommand({
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: AWS_COGNITO_USER_POOL_ID!,
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
const RESEND_CODE_LIMIT_MS = 60000; // 1 minute in milliseconds

export const confirmSignUp = async (
  email: string,
  confirmationCode: string
) => {
  try {
    const clientId = AWS_COGNITO_CLIENT_ID!;
    const clientSecret = AWS_COGNITO_CLIENT_SECRET!;
    const secretHash = generateSecretHash(email, clientId, clientSecret);

    console.log(chalk.red(`==== for confirmSignUp ====`));
    console.log(`clientId ::: ${clientId}`);
    console.log(`clientSecret ::: ${clientSecret}`);
    console.log(`secretHash ::: ${secretHash}`);

    const command = new ConfirmSignUpCommand({
      ClientId: clientId,
      Username: email,
      ConfirmationCode: confirmationCode,
      SecretHash: secretHash,
    });

    const response = await cognitoClient.send(command);

    // Confirm user and update last confirmation timestamp
    await UserRepository.confirmUser(email);
    await UserRepository.updateConfirmationTimestamp(email);

    return response;
  } catch (error: any) {
    if (
      error.message.includes("ExpiredCodeException") ||
      error.message.includes("CodeMismatchException")
    ) {
      throw new Error(
        "The confirmation code is invalid or has expired. Please request a new code."
      );
    }
    throw new Error(error.message);
  }
};

// Function to resend the confirmation code
export const resendConfirmationCode = async (email: string) => {
  try {
    const clientId = AWS_COGNITO_CLIENT_ID!;
    const clientSecret = AWS_COGNITO_CLIENT_SECRET!;
    // Generate the secret hash
    const secretHash = generateSecretHash(email, clientId, clientSecret);

    // Check cooldown period
    const lastSentAt = await UserRepository.getLastConfirmationTimestamp(email);
    const currentTime = Date.now();
    if (lastSentAt && currentTime - lastSentAt < RESEND_CODE_LIMIT_MS) {
      throw new Error("Please wait before requesting a new confirmation code.");
    }

    // Create and send the ResendConfirmationCode command with the SECRET_HASH
    const command = new ResendConfirmationCodeCommand({
      ClientId: clientId,
      Username: email,
      SecretHash: secretHash,
    });

    await cognitoClient.send(command);

    // Update the last confirmation timestamp
    await UserRepository.updateConfirmationTimestamp(email);

    return { message: "Confirmation code resent successfully" };
  } catch (error: any) {
    console.error("Error resending confirmation code:", error.message || error);
    throw error;
  }
};

// Function to log out a user by revoking their refresh token
export const logoutUser = async ({
  // refreshToken,
  accessToken,
}: {
  accessToken: string;
}) => {
  try {
    const params: GlobalSignOutCommandInput = {
      AccessToken: accessToken,
    };
    const command = new GlobalSignOutCommand(params);
    await cognitoClient.send(command);

    return {
      message: "All tokens cleared successfully",
    };
  } catch (error: any) {
    console.error(
      "Error logging out user (revoking token failed):",
      JSON.stringify(error, null, 2)
    );
    throw error;
  }
};
