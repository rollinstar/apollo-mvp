import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

import { authenticationSchema } from '../models/authentication';
import { registerUserSchema } from '../models/model';
import { memberSchema, organizationSchema } from '../models/organization';
import { profileSchema } from '../models/profile';
import { storageSchema } from '../models/storage';
import { userSchema } from '../models/user';

export const ResponseBaseSchemas = {
  message: z.string(),
};

const registerResponseSchema = z.object({
  ...ResponseBaseSchemas,
  data: z
    .object({
      user: userSchema,
      organization: organizationSchema,
      profile: profileSchema,
      authentication: authenticationSchema,
      storage: storageSchema,
    })
    .array(),
});

const signinResponseSchema = z.object({
  ...ResponseBaseSchemas,
  data: z.object({
    access_token: z.string(),
  }),
});

const getMembersResponseSchema = z.object({
  ...ResponseBaseSchemas,
  data: memberSchema.array(),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  { getMembersResponseSchema, registerResponseSchema, registerUserSchema, signinResponseSchema },
  { $id: 'user-schema' },
);
