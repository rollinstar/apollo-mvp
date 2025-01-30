import { z } from 'zod';

export type RegisterUserRequestDTO = z.infer<typeof registerUserSchema>;

export const commonSchema = z.object({
  created_at: z.bigint(),
  updated_at: z.bigint(),
});

export const registerUserSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({ required_error: 'password is required' }),
  user_name: z.string().optional(),
});
