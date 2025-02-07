import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import { AppError } from './error.handlers';

export const errorHandler = (error: FastifyError | AppError, _request: FastifyRequest, reply: FastifyReply) => {
  console.error(error);
  const { statusCode, message, code } = error;
  if (error instanceof AppError) return reply.status(statusCode || 500).send({ message, success: false, code });
  reply.status(error.statusCode || 500).send({ message: error, success: false, code });
};
