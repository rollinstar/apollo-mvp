import { CreateAuthenticationRequestDto } from '../../models/authentication';
import { db } from '../../modules/prisma';

export const create = async (payload: CreateAuthenticationRequestDto) => {
  return db.authentication.create({ data: { ...payload } });
};
