import { ApplicationError } from "./ApplicationError";

export class AuthorizationError extends ApplicationError {
  constructor(
    message: string = "You are not authorized to access this resource"
  ) {
    super(message, 403); // 403 Forbidden
  }
}
