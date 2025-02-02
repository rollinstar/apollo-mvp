import { z } from 'zod';

import { roleTypeSchema } from './authentication';

export type SingedUserTypes = z.infer<typeof signedUserSchema>;
export type SinginRequest = z.infer<typeof signinRequestSchema>;
export const signedUserSchema = z.object({
  user_id: z.string(),
  profile: z.object({
    name: z.string(),
    image_url: z.string(),
  }),
  organization: z.object({
    organization_id: z.string(),
    name: z.string(),
    email: z.string(),
    role: roleTypeSchema,
    storage: z.object({
      assigned_storage: z.bigint(),
      used_storage: z.bigint(),
    }),
  }),
});

export const signinRequestSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({ required_error: 'password is required' }),
});
