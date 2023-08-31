import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Full name is required"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Email is invalid"),
    photo: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z
      .string({
        required_error: "Confirm your password",
      })
      .min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const SuggestionInput = z.object({
  title : z.string({
    required_error : "Please add a title"
  }).min(5).max(100),
  description : z.string({
    required_error : ("Please enter a description.")
  }).min(30).max(1000)
})

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
