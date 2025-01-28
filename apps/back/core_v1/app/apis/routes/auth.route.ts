import { FastifyInstance } from 'fastify';

import { signin } from '../controllers/auth.controller';

async function authRoute(fastify: FastifyInstance) {
  fastify.post('/signin', signin);
}

export default authRoute;
