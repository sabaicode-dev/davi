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
