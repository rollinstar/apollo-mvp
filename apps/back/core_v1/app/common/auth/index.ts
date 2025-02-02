import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../../constants';

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};

export const verifyPassword = async (plainPassword: string, storedHash: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, storedHash);
};
