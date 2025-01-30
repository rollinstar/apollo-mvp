import { z } from 'zod';

import { commonSchema } from './model';

export type CreatePasswordRequestDto = z.infer<typeof createPasswordRequestSchema>;
export type PasswordTypes = z.infer<typeof passwordSchema>;
export const createPasswordRequestSchema = z
  .object({
    user_no: z.bigint(),
    password_hash: z.string(),
  })
  .required();

export const passwordSchema = commonSchema.extend({
  password_no: z.bigint(),
  password_id: z.string(),
  user_no: z.bigint(),
  password_hash: z.string(),
});
