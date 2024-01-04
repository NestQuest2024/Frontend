import {z} from 'zod';

const noLessThanMessage = (type: string, number: number) =>
    `${type} must be at least ${number} characters long.`;
const noMoreThanMessage = (type: string, number: number) =>
    `${type} cannot be longer than ${number} characters.`;

const emailConstraints = () =>
    z
        .string()
        .email({message: 'Provide a valid email address.'})
        .min(5, {message: noLessThanMessage('Email', 5)})
        .max(64, {message: noMoreThanMessage('Email', 64)});

const passwordConstraints = () =>
    z
        .string()
        .min(8, {message: noLessThanMessage('Password', 8)})
        .max(16, {message: noMoreThanMessage('Password', 16)})
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
            message:
                'Password must contain at least one uppercase letter, one number, and one special character(!@#$%^&*).',
        });

export const signInSchema = z.object({
    email: emailConstraints(),
    password: passwordConstraints(),
    remember: z.boolean().optional(),
});

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .min(3, { message: noLessThanMessage('First name', 3) })
            .max(32, { message: noMoreThanMessage('First name', 32) }),
        lastName: z
            .string()
            .min(3, { message: noLessThanMessage('Last name', 3) })
            .max(32, { message: noMoreThanMessage('Last name', 32) }),
        username: z
            .string()
            .min(3, { message: noLessThanMessage('Username', 3) })
            .max(16, { message: noMoreThanMessage('Username', 32) }),
        email: emailConstraints(),
        password: passwordConstraints(),
        confirmPassword: passwordConstraints(),
        remember: z.boolean().optional(),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: 'Passwords must match each other.',
            path: ['confirmPassword'],
        },
    );

export const forgotPasswordSchema = z.object({
    email: emailConstraints(),
});

export const resetPasswordSchema = z
    .object({
        password: passwordConstraints(),
        confirmPassword: passwordConstraints(),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: 'Passwords must match each other.',
            path: ['confirmPassword'],
        },
    );

export type ISignIn = z.infer<typeof signInSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type IForgot = z.infer<typeof forgotPasswordSchema>;
export type IReset = z.infer<typeof resetPasswordSchema>;