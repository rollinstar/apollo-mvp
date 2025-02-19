import { CreatePasswordRequestDto } from '@xcore/models/password';
import { InternalServerError, UnauthorizedError } from '@xcore/neo/app-errors/error.handlers';
import { db } from '@xcore/neo/db/prisma';

export const create = (payload: CreatePasswordRequestDto) => {
  return db.password.create({ data: { ...payload } });
};

export const findHashedPasswordNUserNoByEmail = async (email: string) => {
  const authentication = await db.authentication.findUnique({ where: { email } });
  if (!authentication) throw new UnauthorizedError();
  const { user_no } = authentication;
  try {
    const searched = await db.password.findUnique({ where: { user_no } });
    const { password_hash } = searched!;
    return { password_hash, user_no };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new InternalServerError(errorMessage);
  }
};
