import { z } from 'zod';

import { commonSchema } from './model';

export type createOrganizationRequestDto = z.infer<typeof createOrganizationRequestSchema>;
export type MemberTypes = z.infer<typeof memberSchema>;
export type OrganizationTypes = z.infer<typeof organizationSchema>;
export const createOrganizationRequestSchema = z.object({
  name: z.string().optional(),
  owner: z.bigint({ required_error: 'owner is required' }),
});
export const memberSchema = z.object({
  authentication_id: z.string(),
  email: z.string(),
  role: z.string(),
  user_id: z.string(),
  name: z.string(),
});

export const organizationSchema = commonSchema.extend({
  organization_no: z.bigint(),
  organization_id: z.string(),
  name: z.string(),
  owner: z.bigint(),
});
