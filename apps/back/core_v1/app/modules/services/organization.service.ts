import { db } from '@xcore/neo/db/prisma';

import { createOrganizationRequestDto } from '../../models/organization';

export const create = async (payload: createOrganizationRequestDto) => {
  return db.organization.create({ data: { ...payload } });
};
