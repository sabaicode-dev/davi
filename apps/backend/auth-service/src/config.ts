import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

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
  userServiceUrl: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Force NODE_ENV to 'production' in the production build
  const env = process.env.NODE_ENV || "development";
  const envFileName = env === "production" ? ".env.production" : `.env.${env}`;
  const envPath = path.resolve(__dirname, `./configs/${envFileName}`);

  // Load environment variables
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    throw new Error(`Failed to load .env file at ${envPath}: ${result.error}`);
  }

  // Define schema for validation
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
    USER_SERVICE_URL: Joi.string().optional(), // Optional
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  })
    .unknown()
    .required();

  // Validate environment variables
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
    awsRedirectUri: envVars.AWS_REDIRECT_URI,
    clientUrl: envVars.CLIENT_URL,
    userServiceUrl: envVars.USER_SERVICE_URL,
    awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;
