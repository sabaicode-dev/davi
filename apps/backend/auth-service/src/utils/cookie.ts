import { Response, CookieOptions } from "express";

/**
 * Utility function to set a secure cookie on the Express Response object.
 * @param res - The Express Response object.
 * @param name - Name of the cookie.
 * @param value - Value of the cookie.
 * @param options - Additional options for the cookie.
 */
export function setCookie(
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Secure cookies in production.
    sameSite: process.env.NODE_ENV !== "development" ? "lax" : "none", // Lax for production, none for development.
    maxAge: 3600 * 1000, // Default to 1 hour.
    ...options,
  };

  res.cookie(name, value, defaultOptions);
}
