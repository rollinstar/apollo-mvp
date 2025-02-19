import { db } from '@xcore/neo/db/prisma';

import { CreateStorageRequestDto } from '../../models/storage';

export const create = async (payload: CreateStorageRequestDto) => {
  return db.storage.create({ data: { ...payload } });
};
