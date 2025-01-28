import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

import { authenticationSchema } from '../models/authentication';
import { registerUserSchema } from '../models/model';
import { organizationSchema } from '../models/organization';
import { profileSchema } from '../models/profile';
import { storageSchema } from '../models/storage';
import { userSchema } from '../models/user';

export const ResponseBaseSchemas = {
  message: z.string(),
};

const registerResponseSchema = z.object({
  ...ResponseBaseSchemas,
  data: z.object({
    user: userSchema,
    organization: organizationSchema,
    profile: profileSchema,
    authentication: authenticationSchema,
    storage: storageSchema,
  }),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  { registerResponseSchema, registerUserSchema },
  { $id: 'user-schema' },
);
