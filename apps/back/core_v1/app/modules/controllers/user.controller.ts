import { FastifyReply, FastifyRequest } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { UnauthorizedError } from '../../common/app-errors/error.handlers';
import { hashPassword, verifyPassword } from '../../common/auth';
import { RegisterUserRequestDTO } from '../../models/model';
import { UserTypes } from '../../models/user';
import { create as ceateAuthentication } from '../services/authentication.service';
import { create as createOrganization } from '../services/organization.service';
import { create as createPassword, findHashedPasswordNUserNoByEmail } from '../services/password.service';
import { create as createProfile } from '../services/profile.service';
import { create as createStorage } from '../services/storage.service';
import { create as createUser, findMembersByOrganizationId, findSignedUserByUserNo } from '../services/user.service';

export const getMembers = async (
  request: FastifyRequest<{ Params: { organizationId: string } }>,
  reply: FastifyReply,
) => {
  const { params } = request;
  const { organizationId } = params;
  const users = await findMembersByOrganizationId(organizationId);
  reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK, data: users });
};

export const logout = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.clearCookie('access_token');
  return reply.send({ message: 'Logged out' });
};

export const register = async (request: FastifyRequest<{ Body: RegisterUserRequestDTO }>, reply: FastifyReply) => {
  const { body } = request;
  const { email, password, user_name } = body;
  const user = (await createUser(email, 'password')) as UserTypes;
  const { user_no } = user;
  const password_hash = await hashPassword(password);
  const [organization] = await Promise.all([
    await createOrganization({ name: 'individual', owner: user_no }),
    await createProfile({ user_no, name: user_name || '' }),
    await createPassword({ user_no, password_hash }),
  ]);
  const { organization_no } = organization;
  await Promise.all([
    await ceateAuthentication({ organization_no, user_no, email, role: 'admin' }),
    await createStorage({ organization_no, assigned_storage: 1, used_storage: 0 }),
  ]);
  reply.status(StatusCodes.CREATED);
};

export const signin = async (
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply,
) => {
  const { body } = request;
  const { email, password: candidatePassword } = body;
  const { password_hash, user_no } = await findHashedPasswordNUserNoByEmail(email);
  const verified = await verifyPassword(candidatePassword, password_hash);
  if (!verified) throw new UnauthorizedError('Invalid email or password');
  const signedUser = await findSignedUserByUserNo(user_no);
  const payload = JSON.parse(
    JSON.stringify(signedUser, (_key, value) => (typeof value === 'bigint' ? Number(value.toString()) : value)),
  );
  const token = request.jwt.sign(payload, { expiresIn: '3h' });
  reply.setCookie('access_token', token, { path: '/', httpOnly: true, secure: true });
  reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK, data: { access_token: token } });
};
