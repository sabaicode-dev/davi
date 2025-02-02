import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        username: string;
        email: string;
        password: string;
        role: string;
        confirmed: boolean;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

// Admin-only middleware
export const adminOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Simulating fetching user from the request (normally, you would get this from a session or a decoded token)
  const user = {
    _id: "6764519bfdaf37866d8f0fef",
    username: "Smey Admin",
    email: "roemreaksmey7@gmail.com",
    password: "smey@1234", // Ideally, password should be hashed
    role: "admin",
    confirmed: true,
    createdAt: new Date("2024-12-19T17:02:19.790Z"),
    updatedAt: new Date("2024-12-19T17:02:19.790Z"),
  };

  // Attach user to the request
  req.user = user;

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
