import User, { IUser } from "../models/user.models";

class UserRepository {
  /**
   * Creates a new user with the specified username, email, and Cognito user ID.
   */
  async createUser(
    username: string,
    email: string,
    cognitoUserId: string,
    profile: string,
    confirmed: boolean = false
  ): Promise<IUser> {
    const user = new User({
      username,
      email,
      cognitoUserId,
      profile,
      confirmed,
    });
    return await user.save();
  }

  /**
   * Retrieves a user by their email.
   */
  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  }

  /**
   * Retrieves a user by their Cognito user ID.
   */
  async getUserByCognitoId(cognitoUserId: string): Promise<IUser | null> {
    return await User.findOne({ cognitoUserId }).exec();
  }

  /**
   * Confirms a user's account by setting the confirmed status to true.
   */
  async confirmUser(email: string): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { email },
      { $set: { confirmed: true } },
      { new: true }
    ).exec();
  }

  /**
   * Deletes a user by their email.
   */
  async deleteUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOneAndDelete({ email }).exec();
  }

  /**
   * Updates the username of an existing user by email.
   */
  async updateUsername(
    email: string,
    newUsername: string
  ): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { email },
      { $set: { username: newUsername } },
      { new: true }
    ).exec();
  }

  /**
   * Retrieves the last confirmation timestamp of a user by email.
   */
  async getLastConfirmationTimestamp(email: string): Promise<number | null> {
    const user = await User.findOne(
      { email },
      { lastConfirmationSentAt: 1 }
    ).exec();
    return user?.lastConfirmationSentAt || null;
  }

  /**
   * Updates the last confirmation timestamp of a user by email.
   */
  async updateConfirmationTimestamp(email: string): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { email },
      { $set: { lastConfirmationSentAt: Date.now() } },
      { new: true }
    ).exec();
  }
}

export default new UserRepository();
