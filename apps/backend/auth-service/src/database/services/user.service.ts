import User, { IUser } from "../models/user.models";

/**
 * Saves user data to MongoDB or updates if the user already exists.
 * @param userData - The user data to save.
 * @returns The saved or updated user document.
 */
export const saveUserToDB = async (userData: {
  id?: string; // Make 'id' optional
  email: string;
  cognitoUserId?: string;
  confirmed?: boolean;
}): Promise<IUser | null> => {
  try {
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      user = new User({
        id: userData.id,
        email: userData.email,
        cognitoUserId: userData.cognitoUserId,
        confirmed: userData.confirmed ?? false,
      });
      await user.save();
      console.log("New user saved to MongoDB:", user);
    } else {
      user.cognitoUserId = userData.cognitoUserId || user.cognitoUserId;
      user.confirmed = userData.confirmed ?? user.confirmed;
      await user.save();
      console.log("Existing user updated in MongoDB:", user);
    }

    return user;
  } catch (error: any) {
    console.error("Error saving user to MongoDB:", error);
    throw new Error("Failed to save user to MongoDB.");
  }
};
