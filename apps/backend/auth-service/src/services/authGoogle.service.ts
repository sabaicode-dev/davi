import { URLSearchParams } from "url";
import dotenv from "dotenv";
import path from "path";
// import { fetch } from "undici"; // Use fetch from undici

// Specify the path to your .env file
dotenv.config({ path: path.resolve(__dirname, `../configs/.env.development`) });

const {
  AWS_COGNITO_DOMAIN,
  AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_CLIENT_SECRET,
  AWS_REDIRECT_URI,
} = process.env;

// console.log("AWS_COGNITO_DOMAIN:", AWS_COGNITO_DOMAIN);
// console.log("AWS_COGNITO_CLIENT_ID:", AWS_COGNITO_CLIENT_ID);
// console.log("AWS_COGNITO_CLIENT_SECRET:", AWS_COGNITO_CLIENT_SECRET);
// console.log("AWS_REDIRECT_URI:", AWS_REDIRECT_URI);

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

/**
 * Exchange the authorization code from Google for Cognito tokens.
 * @param code - The authorization code received from Google.
 * @returns Cognito tokens, including access, ID, and refresh tokens.
 */
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

  const response = await fetch(`${AWS_COGNITO_DOMAIN}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorizationHeader,
    },
    body: requestBody.toString(),
  });

  const data: any = await response.json();
  console.log("Response from token exchange:", data);

  if (!response.ok) {
    throw new Error(data.error || "Error exchanging code for tokens");
  }

  return data;
};

/**
 * Revoke the refresh token for signing out the user.
 * @param refreshToken - The refresh token to be revoked.
 */
export const signOut = async (refreshToken: string): Promise<void> => {
  const authorizationHeader = `Basic ${Buffer.from(
    `${AWS_COGNITO_CLIENT_ID}:${AWS_COGNITO_CLIENT_SECRET}`
  ).toString("base64")}`;

  const requestBody = new URLSearchParams({
    token: refreshToken,
  });

  const response = await fetch(`${AWS_COGNITO_DOMAIN}/oauth2/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorizationHeader,
    },
    body: requestBody.toString(),
  });

  if (!response.ok) {
    const data: any = await response.json();
    throw new Error(data.error || "Error revoking token");
  }
};
