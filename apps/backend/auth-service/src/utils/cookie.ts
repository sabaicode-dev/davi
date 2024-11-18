import { Response, CookieOptions } from "express";

/**
 * Sets a cookie on the given Express Response object.
 * @param res - The Express Response object
 * @param name - Name of the cookie
 * @param value - Value of the cookie
 * @param options - Additional options for the cookie
 */
export function setCookie(
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure `secure` is true only in production
    sameSite: "none", // Set to None for cross-origin requests
    maxAge: 3600 * 1000, // Cookie expires after 1 hour
    ...options,
  };

  console.log(`Setting cookie: ${name}, value: ${value}`); // Add logging for debugging
  res.cookie(name, value, defaultOptions);
}
