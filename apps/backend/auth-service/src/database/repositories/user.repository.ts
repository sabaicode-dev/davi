// src/repositories/user.repository.ts
import User, { IUser } from "../models/user.models";

class UserRepository {
  /**
   * Creates a new user with the specified username, email, and Cognito user ID.
   */
  async createUser(
    username: string,
    email: string,
    cognitoUserId: string,
    confirmed: boolean = false
  ): Promise<IUser> {
    const user = new User({ username, email, cognitoUserId, confirmed });
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
}

export default new UserRepository();
