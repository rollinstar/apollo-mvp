import { z } from 'zod';

import { commonSchema } from './model';

export type CreateStorageRequestDto = z.infer<typeof createStorageRequestSchema>;
export type StorageTypes = z.infer<typeof storageSchema>;
export const createStorageRequestSchema = z
  .object({
    organization_no: z.bigint({ required_error: 'organization_no is required' }),
    assigned_storage: z.number({ required_error: 'assigned_storage is required' }),
    used_storage: z.number({ required_error: 'used_storage is required' }),
  })
  .required();
export const storageSchema = commonSchema.extend({
  storage_no: z.bigint(),
  storage_id: z.string(),
  organization_no: z.bigint(),
  assigned_storage: z.number(),
  used_storage: z.number(),
});
