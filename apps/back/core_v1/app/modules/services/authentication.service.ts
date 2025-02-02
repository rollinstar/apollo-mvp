import { db } from '../../common/prisma';
import { CreateAuthenticationRequestDto } from '../../models/authentication';

export const create = async (payload: CreateAuthenticationRequestDto) => {
  return db.authentication.create({ data: { ...payload } });
};

export const findAuthentications = async (organization_no: bigint) => {
  return db.authentication.findMany({
    where: { organization_no },
    select: { authentication_id: true, user_no: true, email: true, role: true },
  });
};
