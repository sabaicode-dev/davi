import { ApplicationError } from "./ApplicationError";

export class AuthenticationError extends ApplicationError {
  constructor(message: string = "Authentication failed") {
    super(message, 401); // 401 Unauthorized
  }
}
