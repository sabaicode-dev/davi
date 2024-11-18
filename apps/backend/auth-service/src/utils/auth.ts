const jwt = require("jsonwebtoken");
console.log(jwt);

interface JwtPayload {
  email: string;
  username?: string; // Add other fields if necessary
}

export const verifyToken = (token: string): JwtPayload => {
  const secret = "http://localhost:4001/v1/auth/google/callback";
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.verify(token, secret) as JwtPayload;
};
