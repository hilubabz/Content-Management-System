import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),
    repassword: z.string().min(1, "Confirm password is required"),
    username: z.string().min(1, "Username is required"),
    profilePicture: z.custom<File>(
      (file) => file instanceof File,
      "Please upload an image",
    ),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;
