import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import authRoute from './apis/routes/auth.route';
import userRoute from './apis/routes/user.route';
import { CORE_MVP, SWAGGER_OPTIONS, SWAGGER_UI_OPTIONS } from './constants';
import { errorHandler } from './modules/app-errors/helper';
import { checkDatabaseConnection } from './modules/health.check';
import { AppSchemas } from './schemas';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
});

fastify.register(fastifyCookie, { secret: 'iamsecret', hook: 'onRequest' });
fastify.register(swagger, SWAGGER_OPTIONS);
fastify.register(swaggerUI, SWAGGER_UI_OPTIONS);
fastify.register(sensible);

fastify.get(`/${CORE_MVP}/health`, async (_request: FastifyRequest, reply: FastifyReply) => {
  const dbStatus = await checkDatabaseConnection();
  const data = { uptime: process.uptime(), dbConnection: dbStatus };
  reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK, data });
});

fastify.setErrorHandler(errorHandler);

AppSchemas.forEach((s) => fastify.addSchema(s));
fastify.register(authRoute, { prefix: `/${CORE_MVP}/auth` });
fastify.register(userRoute, { prefix: `/${CORE_MVP}/user` });

export default fastify;
