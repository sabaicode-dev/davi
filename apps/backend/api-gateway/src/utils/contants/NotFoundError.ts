import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
    constructor(resource: string = "Resource") {
        super(`${resource} not found`, 404); // 404 Not Found
    }
}
