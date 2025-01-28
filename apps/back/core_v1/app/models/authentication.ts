import { z } from 'zod';

import { commonSchema } from './model';

const roleTypeSchema = z.union([z.literal('admin'), z.literal('editor'), z.literal('viewer')]);
export type AuthenticationTypes = z.infer<typeof authenticationSchema>;
export type CreateAuthenticationRequestDto = z.infer<typeof createAuthenticationRequestSchema>;
export const authenticationSchema = commonSchema.extend({
  authentication_no: z.bigint(),
  authentication_id: z.string(),
  organization_no: z.bigint(),
  user_no: z.bigint(),
  email: z.string(),
  role: roleTypeSchema,
});
export const createAuthenticationRequestSchema = z.object({
  organization_no: z.bigint({ required_error: 'organization_no is required' }),
  user_no: z.bigint({ required_error: 'user_no is required' }),
  email: z.string({ required_error: 'email is required' }),
  role: roleTypeSchema,
});
