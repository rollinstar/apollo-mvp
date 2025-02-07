import { db } from '../../common/prisma';
import { createOrganizationRequestDto } from '../../models/organization';

export const create = async (payload: createOrganizationRequestDto) => {
  return db.organization.create({ data: { ...payload } });
};
