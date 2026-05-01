import * as z from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Must include at least one uppercase letter')
  .regex(/[a-z]/, 'Must include at least one lowercase letter')
  .regex(/\d/, 'Must include at least one number');

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: passwordSchema,
});

const registerSchema = z
  .object({
    confirmPassword: z.string().min(1, 'Please re-enter your password'),
    email: z.email('Invalid email'),
    password: passwordSchema,
    userName: z
      .string()
      .min(3, 'User name must be at least 3 characters long')
      .max(32, 'User name must be at most 32 characters long'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export { loginSchema, registerSchema };
