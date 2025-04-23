import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field cannot be empty" })
    .email({ message: "This is not a valid email" }),
  password: z.string().min(1),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(1).toLowerCase(),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
