import * as AWS from "aws-sdk";
import configs from "@/src/config"; // Replace with the actual path to your config file
import User from "@/src/database/models/user.models";

import { CognitoIdentityServiceProvider } from "aws-sdk";

// Update AWS SDK configuration to include the region
AWS.config.update({
  region: configs.awsCognitoRegion, // Ensure this is the correct AWS region, e.g., "us-east-1"
});

const awsCognitoUserPoolId = configs.awsCognitoUserPoolId;
const cognito = new CognitoIdentityServiceProvider();

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const params = {
    UserPoolId: awsCognitoUserPoolId, // Replace with your Cognito User Pool ID
    Filter: `email = "${email}"`, // Filter by email
  };

  try {
    const result = await cognito.listUsers(params).promise();

    // Check if any user with the provided email exists
    if (result.Users && result.Users.length > 0) {
      return true; // Email exists
    } else {
      return false; // Email doesn't exist
    }
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw new Error("Error checking email existence");
  }
};

export async function checkIfUserExistsInDb(email: string): Promise<boolean> {
  try {
    // Check if a user with the provided email exists
    const user = await User.findOne({ email }).exec();

    // If a user is found, return true, otherwise false
    return user ? true : false;
  } catch (error) {
    console.error("Error checking if user exists in DB:", error);
    throw new Error("Database query failed.");
  }
}
