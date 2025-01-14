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

const userFormSchema = z.object({
  name: z.string().trim(),
  email: z.string().email().trim(),
  phone: z.string().trim(),
  gender: z.string().trim(),
  role: z.string().trim(),
  address: z.object({
    street: z.string().trim(),
    city: z.string().trim(),
    state: z.string().trim(),
    zipCode: z.string().trim(),
  }),
});

const bookingFormSchema = z.object({
  service: z.string().trim(),
  appointmentDate: z.string().trim(),
  vehicleDetails: z.object({
    company: z.string().trim(),
    model: z.string().trim(),
    year: z.string().trim(),
    licencePlate: z.string().trim(),
    notes: z.string().trim(),
  }),
});

export {
  registerFormSchema,
  loginFormSchema,
  userFormSchema,
  bookingFormSchema,
};
