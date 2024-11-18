import { URLSearchParams } from "url";
import dotenv from "dotenv";
import path from "path";
import axios from "axios";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../configs/.env.development") });

const {
  AWS_COGNITO_DOMAIN,
  AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_CLIENT_SECRET,
  AWS_REDIRECT_URI,
} = process.env;

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

  // Construct the request body for the token exchange
  const requestBody = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: AWS_COGNITO_CLIENT_ID as string,
    refresh_token: refreshToken,
  });

  try {
    // Make the request to exchange the refresh token for new tokens
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

    return response.data; // Contains new access_token, id_token, and refresh_token (optional)
  } catch (error) {
    const err = error as any;
    console.error(
      "Error exchanging refresh token:",
      err.response?.data || err.message
    );
    throw new Error("Failed to refresh tokens");
  }
};
