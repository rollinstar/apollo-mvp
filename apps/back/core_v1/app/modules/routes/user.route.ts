import { getMembers, logout, register, signin } from '@xcore/modules/controllers/user.controller';
import { $ref } from '@xcore/schemas/user.schema';
import { FastifyInstance } from 'fastify';

const registerRouteSchema = {
  tags: ['USER'],
  description: 'Register a user',
  summary: '',
  body: $ref('registerUserSchema'),
  response: {
    201: $ref('registerResponseSchema'),
  },
};

const signinRouteSchema = {
  tags: ['USER'],
  description: 'Sign in',
  summary: '',
  response: {
    200: $ref('signinResponseSchema'),
  },
};

const getMemberRouteSchema = {
  tags: ['USER'],
  description: 'Find a list of members for an organization',
  summary: '',
  params: {
    type: 'object',
    properties: { organizationId: { type: 'string' } },
    required: ['organizationId'],
  },
  response: {
    200: $ref('getMembersResponseSchema'),
  },
};

interface MemberParams {
  Params: {
    organizationId: string;
  };
}

async function userRoute(fastify: FastifyInstance) {
  fastify.post('/signup', { schema: registerRouteSchema }, register);
  fastify.post('/signin', { schema: signinRouteSchema }, signin);
  fastify.get<MemberParams>(
    '/members/:organizationId',
    { schema: getMemberRouteSchema, preHandler: [fastify.authenticate] },
    getMembers,
  );
  fastify.delete('/logout', { schema: getMemberRouteSchema, preHandler: [fastify.authenticate] }, logout);
  fastify.log.info('user routes registered');
}

export default userRoute;
