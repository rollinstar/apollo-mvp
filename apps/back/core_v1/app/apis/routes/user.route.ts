import { FastifyInstance } from 'fastify';

import { $ref } from '../../schemas/user.schema';
import { register } from '../controllers/user.controller';

const registerRouteSchema = {
  tags: ['USER'],
  description: 'Register a user',
  summary: '',
  body: $ref('registerUserSchema'),
  response: {
    200: $ref('registerResponseSchema'),
  },
};

async function userRoute(fastify: FastifyInstance) {
  fastify.post('/signup', { schema: registerRouteSchema }, register);
}

export default userRoute;
