import { z } from 'zod';

import { NotFoundError, UnauthorizedError } from '../../common/app-errors/error.handlers';
import { db } from '../../common/prisma';
import { util_uuidToBase64 } from '../../common/utils';
import { SingedUserTypes } from '../../models/auth';
import { ServiceRoleTypes } from '../../models/authentication';
import { MemberTypes } from '../../models/organization';
import { LoginTypes } from '../../models/user';
import { findAuthentications } from './authentication.service';

export const create = async (email: string, login_type: LoginTypes) => {
  const profile = await db.authentication.findUnique({ where: { email } });
  if (!profile) throw new UnauthorizedError('User already exists with this email');
  return db.users.create({ data: { login_type } });
};

export const find = async (user_no: bigint) => {
  return db.users.findUnique({ where: { user_no } });
};

export const findMembersByOrganizationId = async (organization_id: string) => {
  const organization = await db.organization.findUnique({ where: { organization_id } });
  if (!organization) throw new NotFoundError('Organization does not exist');
  const { organization_no } = organization;
  const authentications = await findAuthentications(organization_no);
  const members: MemberTypes[] = [];
  for (const authentication of authentications) {
    const { authentication_id, user_no, email, role } = authentication;
    const [user, profile] = await Promise.all([find(user_no), db.profile.findUnique({ where: { user_no } })]);
    const { user_id } = user!;
    const { name } = profile!;
    const member: MemberTypes = {
      authentication_id: util_uuidToBase64(authentication_id),
      email,
      role,
      user_id: util_uuidToBase64(user_id),
      name: name || 'NoName',
    };
    members.push(member);
  }
  return members;
};

export const findSignedUserByUserNo = async (user_no: bigint): Promise<SingedUserTypes> => {
  const [user, profile, organization, authentication] = await Promise.all([
    await db.users.findUnique({ where: { user_no } }),
    await db.profile.findFirst({ where: { user_no } }),
    await db.organization.findFirst({ where: { owner: user_no } }),
    await db.authentication.findFirst({ where: { user_no } }),
  ]);
  const { organization_no } = organization!;
  const storage = await db.storage.findFirst({ where: { organization_no } });
  const { user_id } = user!;
  const { name: user_name, image_url } = profile!;
  const { organization_id, name: organization_name } = organization!;
  const { email, role } = authentication!;
  const serviceRole = role as ServiceRoleTypes;
  const { assigned_storage, used_storage } = storage!;
  return {
    user_id: util_uuidToBase64(user_id),
    profile: { name: user_name || '', image_url: image_url || '' },
    organization: {
      organization_id: util_uuidToBase64(organization_id),
      name: organization_name || '',
      email,
      role: serviceRole,
      storage: { assigned_storage, used_storage },
    },
  };
};
