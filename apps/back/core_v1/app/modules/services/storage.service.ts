import { db } from '../../common/prisma';
import { CreateStorageRequestDto } from '../../models/storage';

export const create = async (payload: CreateStorageRequestDto) => {
  return db.storage.create({ data: { ...payload } });
};
