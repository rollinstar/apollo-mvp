import { FastifyReply, FastifyRequest } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { RegisterUserRequestDTO } from '../../models/model';
import { UserTypes } from '../../models/user';
import { hashPassword } from '../../modules/auth';
import { create as ceateAuthentication } from '../services/authentication.service';
import { create as createOrganization } from '../services/organization.service';
import { create as createPassword } from '../services/password.service';
import { create as createProfile } from '../services/profile.service';
import { create as createStorage } from '../services/storage.service';
import { create as createUser } from '../services/user.service';
export const register = async (request: FastifyRequest<{ Body: RegisterUserRequestDTO }>, reply: FastifyReply) => {
  const { body } = request;
  const { email, password, user_name } = body;
  const user = (await createUser('password')) as UserTypes;
  const { user_no } = user;
  const password_hash = await hashPassword(password);
  const [organization, profile] = await Promise.all([
    await createOrganization({ name: 'individual', owner: user_no }),
    await createProfile({ user_no, name: user_name || '' }),
    await createPassword({ user_no, password_hash }),
  ]);
  const { organization_no } = organization;
  const [authentication, storage] = await Promise.all([
    await ceateAuthentication({ organization_no, user_no, email, role: 'admin' }),
    await createStorage({ organization_no, assigned_storage: 1, used_storage: 0 }),
  ]);
  const data = { user, organization, profile, authentication, storage };
  reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK, data });
};
