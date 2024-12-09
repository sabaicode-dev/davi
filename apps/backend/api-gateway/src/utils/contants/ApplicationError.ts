export class ApplicationError extends Error {
    public readonly status: number; // HTTP status code
    public readonly errors: any[]; // Additional error details
    public readonly isOperational: boolean; // Operational vs. programming error

    /**
     * Creates an instance of ApplicationError.
     *
     * @param message - The error message.
     * @param status - The HTTP status code associated with the error.
     * @param errors - Additional error details.
     * @param isOperational - Whether the error is operational (user-facing).
     */
    constructor(
        message: string,
        status: number = 500,
        errors: any[] = [],
        isOperational: boolean = true
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
        this.status = status;
        this.errors = errors;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}
