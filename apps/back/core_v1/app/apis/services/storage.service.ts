import { CreateStorageRequestDto } from '../../models/storage';
import { db } from '../../modules/prisma';

export const create = async (payload: CreateStorageRequestDto) => {
  return db.storages.create({ data: { ...payload } });
};
