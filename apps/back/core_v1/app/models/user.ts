import { z } from 'zod';

import { commonSchema } from './model';

const loginTypeSchema = z.union([z.literal('password'), z.literal('social')]);
export type LoginTypes = z.infer<typeof loginTypeSchema>;
export type UserTypes = z.infer<typeof userSchema>;
export const userSchema = commonSchema.extend({
  user_no: z.bigint(),
  user_id: z.string(),
  login_type: loginTypeSchema,
  created_at: z.bigint(),
  updated_at: z.bigint(),
});
