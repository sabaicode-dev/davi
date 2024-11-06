import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

// Define a TypeScript type for the configuration
type Config = {
  env: string;
  port: number;
  mongodbURL: string;
  awsCognitoRegion: string;
  awsCognitoUserPoolId: string;
  awsCognitoClientId: string;
  awsCognitoClientSecret: string;
  awsCognitoIdentityPoolId: string;
  awsCognitoDomain: string;
  awsRedirectUri: string;
  clientUrl: string;
  userServiceUrl?: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
};

// Determine the correct .env file based on NODE_ENV
const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "configs/.env.production")
    : path.resolve(__dirname, "configs/.env.development");

// Load environment variables from the determined .env file
dotenv.config({ path: envPath });

// Debug log to confirm loading
console.log("Loaded environment file from:", envPath);
console.log("AWS_COGNITO_DOMAIN:", process.env.AWS_COGNITO_DOMAIN); // Debug check

// Define schema for environment variables validation using Joi
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production").required(),
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().required(),
  AWS_COGNITO_REGION: Joi.string().required(),
  AWS_COGNITO_USER_POOL_ID: Joi.string().required(),
  AWS_COGNITO_CLIENT_ID: Joi.string().required(),
  AWS_COGNITO_CLIENT_SECRET: Joi.string().required(),
  AWS_COGNITO_IDENTITY_POOL_ID: Joi.string().required(),
  AWS_COGNITO_DOMAIN: Joi.string().required(),
  AWS_REDIRECT_URI: Joi.string().required(),
  CLIENT_URL: Joi.string().required(),
  USER_SERVICE_URL: Joi.string().optional(), // Optional environment variable
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
})
  .unknown()
  .required();

// Validate the loaded environment variables against the schema
const { value: envVars, error } = envVarsSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `Config validation error: ${error.details
      .map((err) => err.message)
      .join(", ")}`
  );
}

// Export the validated configuration
const configs: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodbURL: envVars.MONGODB_URL,
  awsCognitoRegion: envVars.AWS_COGNITO_REGION,
  awsCognitoUserPoolId: envVars.AWS_COGNITO_USER_POOL_ID,
  awsCognitoClientId: envVars.AWS_COGNITO_CLIENT_ID,
  awsCognitoClientSecret: envVars.AWS_COGNITO_CLIENT_SECRET,
  awsCognitoIdentityPoolId: envVars.AWS_COGNITO_IDENTITY_POOL_ID,
  awsCognitoDomain: envVars.AWS_COGNITO_DOMAIN,
  awsRedirectUri: envVars.AWS_REDIRECT_URI,
  clientUrl: envVars.CLIENT_URL,
  userServiceUrl: envVars.USER_SERVICE_URL,
  awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
};

export default configs;
