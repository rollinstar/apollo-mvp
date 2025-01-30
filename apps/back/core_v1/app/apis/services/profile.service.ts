import { CreateProfileRequestDto } from '../../models/profile';
import { db } from '../../modules/prisma';

export const create = async (payload: CreateProfileRequestDto) => {
  return db.profile.create({ data: { ...payload } });
};
