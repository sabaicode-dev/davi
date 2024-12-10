import { URLSearchParams } from "url";
import axios from "axios";
import chalk from "chalk";
import configs from "../config";

const AWS_COGNITO_DOMAIN = configs.awsCognitoDomain;
const AWS_COGNITO_CLIENT_ID = configs.awsCognitoClientId;
const AWS_COGNITO_CLIENT_SECRET = configs.awsCognitoClientSecret;
const AWS_REDIRECT_URI = configs.awsRedirectUri;
const NODE_ENV = configs.env;

console.log(chalk.red(`======== Using for ${NODE_ENV} Google==========`));

console.log(`AWS_COGNITO_DOMAIN : ${AWS_COGNITO_DOMAIN}`);
console.log(`AWS_COGNITO_CLIENT_ID : ${AWS_COGNITO_CLIENT_ID}`);
console.log(`AWS_COGNITO_CLIENT_SECRET : ${AWS_COGNITO_CLIENT_SECRET}`);
console.log(`AWS_REDIRECT_URI : ${AWS_REDIRECT_URI}`);

/**
 * Generate the Google Sign-In URL.
 * @returns The Google Sign-In URL to redirect the user.
 */
export const googleSignIn = (): string => {
  if (!AWS_COGNITO_DOMAIN || !AWS_COGNITO_CLIENT_ID || !AWS_REDIRECT_URI) {
    throw new Error(
      "Missing environment variables: Ensure AWS_COGNITO_DOMAIN, AWS_COGNITO_CLIENT_ID, and AWS_REDIRECT_URI are defined"
    );
  }

  const state = Math.random().toString(36).substring(7); // Generate a random state
  const authorizeParams = new URLSearchParams({
    response_type: "code",
    client_id: AWS_COGNITO_CLIENT_ID as string,
    redirect_uri: AWS_REDIRECT_URI as string,
    state: state,
    identity_provider: "Google",
    scope: "openid profile email",
  });

  return `${AWS_COGNITO_DOMAIN}/oauth2/authorize?${authorizeParams.toString()}`;
};

export const exchangeCodeForTokens = async (code: string): Promise<any> => {
  const authorizationHeader = `Basic ${Buffer.from(
    `${AWS_COGNITO_CLIENT_ID}:${AWS_COGNITO_CLIENT_SECRET}`
  ).toString("base64")}`;

  const requestBody = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: AWS_COGNITO_CLIENT_ID as string,
    code: code,

    redirect_uri: AWS_REDIRECT_URI as string,
  });

  const response = await axios.post(
    `${AWS_COGNITO_DOMAIN}/oauth2/token`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
    }
  );

  return response.data;
};
/**
 * Exchanges a refresh token for a new set of access and ID tokens.
 * @param refreshToken - The refresh token to be exchanged.
 * @returns The new tokens (access_token, id_token, and optionally refresh_token).
 */

export const exchangeRefreshTokenForNewTokens = async (
  refreshToken: string
): Promise<any> => {
  const authorizationHeader = `Basic ${Buffer.from(
    `${AWS_COGNITO_CLIENT_ID}:${AWS_COGNITO_CLIENT_SECRET}`
  ).toString("base64")}`;

  const requestBody = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: AWS_COGNITO_CLIENT_ID as string,
    refresh_token: refreshToken,
  });

  try {
    const response = await axios.post(
      `${AWS_COGNITO_DOMAIN}/oauth2/token`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: authorizationHeader,
        },
      }
    );

    if (!response.data.access_token || !response.data.id_token) {
      throw new Error("Invalid token response: Missing access or ID token");
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "Error exchanging refresh token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to refresh tokens");
  }
};
