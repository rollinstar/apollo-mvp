import { FastifyReply, FastifyRequest } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { find } from '../services/user.service';

interface User {
  user_no: bigint;
  user_id: string;
  login_type: string;
  created_at: bigint;
  updated_at: bigint;
}

export const signin = async (
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply,
) => {
  const { body } = request;
  const { email, password } = body;
  console.log(`email: ${email}`);
  console.log(`password: ${password}`);
  const users: User[] = await find();
  const data = JSON.stringify(users[0], (_, value) => (typeof value === 'bigint' ? Number(value.toString()) : value));
  reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK, data: JSON.parse(data) });
};
