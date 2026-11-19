import { z } from 'zod';

const withinBcryptByteLimit = (password) =>
  Buffer.byteLength(password, 'utf8') <= 72;

const byteLimitMessage = 'Password must be at most 72 bytes long.';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters long.')
    .max(100, 'Name must be at most 100 characters long.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .refine(withinBcryptByteLimit, byteLimitMessage),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .refine(withinBcryptByteLimit, byteLimitMessage),
});
