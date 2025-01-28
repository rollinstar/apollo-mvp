import { CreatePasswordRequestDto } from '../../models/password';
import { db } from '../../modules/prisma';

export const create = (payload: CreatePasswordRequestDto) => {
  return db.password.create({ data: { ...payload } });
};
