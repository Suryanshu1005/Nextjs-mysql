import { z } from "zod";

export const RegisterUserSchema = z.object({
    username: z
        .string({ required_error: "Username is Required", })
        .min(1, "Enter Your Full Name"),
    email: z
        .string({ required_error: "Email is Required", })
        .min(1, "Please enter your full email")
        .email("Email is invalid"),
    password: z
        .string({ required_error: "Password is Required" })
        .min(1, "Password is required")
        .min(3, "Password must be more than 3 character")
        .max(18, "Password must be less than 18 characters"),
    password2: z
        .string({ required_error: "Confirm your password" })
        .min(1, "Confirm your password")
})

    .refine((data) => data.password === data.password2, {
        path: ["password2"],
        message: "Password do not match"
    })


export type RegisterUserInput = z.infer<typeof RegisterUserSchema>