import { db } from '@xcore/neo/db/prisma';

import { CreateProfileRequestDto } from '../../models/profile';

export const create = async (payload: CreateProfileRequestDto) => {
  return db.profile.create({ data: { ...payload } });
};
