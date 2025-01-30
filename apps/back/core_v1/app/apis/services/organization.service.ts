import { createOrganizationRequestDto } from '../../models/organization';
import { db } from '../../modules/prisma';

export const create = async (payload: createOrganizationRequestDto) => {
  return db.organizations.create({ data: { ...payload } });
};
