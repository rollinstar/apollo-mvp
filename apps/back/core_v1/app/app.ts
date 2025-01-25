import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { CORE_MVP, SWAGGER_OPTIONS, SWAGGER_UI_OPTIONS } from './constants';
import { checkDatabaseConnection } from './modules/health.check';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
});

fastify.register(swagger, SWAGGER_OPTIONS);
fastify.register(swaggerUI, SWAGGER_UI_OPTIONS);
fastify.register(sensible);

fastify.get(`/${CORE_MVP}/health`, async (_request: FastifyRequest, reply: FastifyReply) => {
  const dbStatus = await checkDatabaseConnection();
  const data = { uptime: process.uptime(), dbConnection: dbStatus };
  reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK, data });
});

export default fastify;
