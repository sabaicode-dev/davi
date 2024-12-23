// src/middleware/authorization.ts
import { Request, Response, NextFunction } from "express";

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = req.body.admin; // Assume `req.body.admin` contains admin data from previous authentication middleware.

  console.log(`admin :::`, admin);

  if (admin?.role === "admin") {
    return next(); // User is an admin, proceed to the next handler.
  }

  return res.status(403).json({ error: "Access denied. Admins only." });
};
