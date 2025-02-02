import { db } from '../../common/prisma';
import { CreateProfileRequestDto } from '../../models/profile';

export const create = async (payload: CreateProfileRequestDto) => {
  return db.profile.create({ data: { ...payload } });
};
