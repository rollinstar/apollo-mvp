import { z } from 'zod';

import { commonSchema } from './model';

export type CreateProfileRequestDto = z.infer<typeof createProfileRequestSchema>;
export type ProfileTypes = z.infer<typeof profileSchema>;
export const createProfileRequestSchema = z.object({
  user_no: z.bigint(),
  name: z.string().optional(),
  image_url: z.string().optional(),
});
export const profileSchema = commonSchema.extend({
  profile_no: z.bigint(),
  profile_id: z.string(),
  user_no: z.bigint(),
  name: z.string(),
  image_url: z.string(),
});
