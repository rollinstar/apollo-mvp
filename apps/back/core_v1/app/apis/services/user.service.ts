import { LoginTypes } from '../../models/user';
import { db } from '../../modules/prisma';

export const create = (login_type: LoginTypes) => {
  return db.users.create({ data: { login_type } });
};

export const find = () => {
  return db.users.findMany();
};
