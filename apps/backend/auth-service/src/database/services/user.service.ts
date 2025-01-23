import User, { IUser } from "../models/user.models";

/**
 * Saves user data to MongoDB or updates if the user already exists.
 * @param userData - The user data to save.
 * @returns The saved or updated user document.
 */
export const saveUserToDB = async (userData: {
  email: string;
  username: string;
  cognitoUserId?: string;
  profile: string;
  confirmed?: boolean;
}): Promise<IUser | null> => {
  try {
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      // Create a new user
      user = new User({
        email: userData.email,
        username: userData.username,
        cognitoUserId: userData.cognitoUserId,
        profile: userData.profile,
        confirmed: userData.confirmed ?? false,
      });
      await user.save();
      console.log("New user saved to MongoDB:", user);
    } else {
      // Update existing user
      user.username = userData.username || user.username;
      user.cognitoUserId = userData.cognitoUserId || user.cognitoUserId;
      user.profile = userData.profile || user.profile;
      user.confirmed = userData.confirmed ?? user.confirmed;
      await user.save();
    }

    return user;
  } catch (error: any) {
    console.error("Error saving user to MongoDB:", error);
    throw new Error("Failed to save user to MongoDB.");
  }
};
