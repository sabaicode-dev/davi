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
  dashboardUrl: string;
  userServiceUrl?: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsS3BucketName: string;
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Determine the environment and set the appropriate .env file path
  const env = process.env.NODE_ENV || "development";
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);

  // Load environment variables from the specified .env file
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    throw new Error(`Failed to load .env file at ${envPath}: ${result.error}`);
  }

  // Define schema for environment variables validation using Joi
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid("development", "production").required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
    AWS_COGNITO_REGION: Joi.string().required(),
    AWS_COGNITO_USER_POOL_ID: Joi.string().required(),
    AWS_COGNITO_CLIENT_ID: Joi.string().required(),
    AWS_COGNITO_CLIENT_SECRET: Joi.string().required(),
    AWS_COGNITO_DOMAIN: Joi.string().required(),
    AWS_REDIRECT_URI: Joi.string().required(),
    DASHBOARD_URL: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_S3_BUCKET_NAME: Joi.string().required(),
  })
    .unknown()
    .required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env, {
    abortEarly: false, // Show all validation errors at once
  });

  // Handle validation errors
  if (error) {
    const errorMessages = error.details.map((err) => err.message).join(", ");
    throw new Error(`Config validation error: ${errorMessages}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodbURL: envVars.MONGODB_URL,
    awsCognitoRegion: envVars.AWS_COGNITO_REGION,
    awsCognitoUserPoolId: envVars.AWS_COGNITO_USER_POOL_ID,
    awsCognitoClientId: envVars.AWS_COGNITO_CLIENT_ID,
    awsCognitoClientSecret: envVars.AWS_COGNITO_CLIENT_SECRET,
    awsCognitoIdentityPoolId: envVars.AWS_COGNITO_IDENTITY_POOL_ID,
    awsCognitoDomain: envVars.AWS_COGNITO_DOMAIN,
    dashboardUrl: envVars.DASHBOARD_URL, // Dynamically assigned clientUrl
    awsRedirectUri: envVars.AWS_REDIRECT_URI, // Dynamically
    awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    awsS3BucketName: envVars.AWS_S3_BUCKET_NAME,
  };
}

// Export the loaded configuration
const configs = loadConfig();

export default configs;
