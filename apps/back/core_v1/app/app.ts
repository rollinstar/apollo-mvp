import { decode } from 'node:punycode';

import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { errorHandler } from './common/app-errors/helper';
import { checkDatabaseConnection } from './common/health.check';
import { CORE_MVP, SWAGGER_OPTIONS, SWAGGER_UI_OPTIONS } from './constants';
import userRoute from './modules/routes/user.route';
import { AppSchemas } from './schemas';

const fastify = Fastify({ logger: true });

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies.access_token;
  if (!token) return reply.status(401).send({ message: 'Authentication required' });
  const decodedToken = request.jwt.verify<FastifyJWT['user']>(token);
  request.user = decodedToken;
}

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
});
fastify.register(fjwt, { secret: '2737a85a8d9437817cd95e98d0fd97418468da48f8b92bc576004046d5dcbd9b' });
fastify.addHook('preHandler', (request: FastifyRequest, _reply: FastifyReply, next) => {
  request.jwt = fastify.jwt;
  return next();
});
fastify.register(fastifyCookie, { secret: 'iamsecret', hook: 'preHandler' });
fastify.decorate('authenticate', authenticate);
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
fastify.register(userRoute, { prefix: `/${CORE_MVP}/user` });

export default fastify;
