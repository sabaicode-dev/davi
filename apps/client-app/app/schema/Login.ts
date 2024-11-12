// src/schema/login.ts

import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
