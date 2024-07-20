import { z } from "zod";


export const registerSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be of six characters atleast"),
  username: z.string().min(1, "username is required"),
  firstname: z.string(),
  lastname: z.string(),
  profile_pic: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be of six characters atleast"),
});

export const userdetailsSchema = z.object({
  username: z.string().min(1),
  id: z.number(),
});


