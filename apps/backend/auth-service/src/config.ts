import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

// Load environment variables based on NODE_ENV
const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "configs/.env.production")
    : path.resolve(__dirname, "configs/.env.development");

dotenv.config({ path: envPath }); // Load the environment file

// Define schema for validation using Joi
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
  USER_SERVICE_URL: Joi.string().optional(),
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

// Export validated config
const configs = {
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
