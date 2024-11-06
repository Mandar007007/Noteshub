    import { z } from 'zod';

    export const userNameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

    export const signUpSchema = z.object({
        username: userNameValidation,
        email: z.string().email({ message: "Invalid Email Address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        branch: z.enum(["CE", "EC", "ME", "CH"], { required_error: "Please select a branch" }),
        year: z.enum(["1", "2", "3", "4"], { required_error: "Please select a year" }),
        studentId: z.string().length(10, { message: "Student ID must be 10 digits" })
    });