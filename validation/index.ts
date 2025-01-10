import { z } from "zod";

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .trim(),
    email: z.string().email().trim(),
    password: z.string().trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
});

export { registerFormSchema, loginFormSchema };
