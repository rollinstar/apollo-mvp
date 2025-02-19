import { authenticationSchema } from '@xcore/models/authentication';
import { registerUserSchema } from '@xcore/models/model';
import { memberSchema, organizationSchema } from '@xcore/models/organization';
import { profileSchema } from '@xcore/models/profile';
import { storageSchema } from '@xcore/models/storage';
import { userSchema } from '@xcore/models/user';
import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

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
