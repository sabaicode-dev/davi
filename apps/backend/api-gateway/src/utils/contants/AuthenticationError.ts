import { ApplicationError } from "./ApplicationError";

export class AuthenticationError extends ApplicationError {
  constructor(message: string) {
    super(message, 401); // 401 Unauthorized
  }
}
