import { db } from './prisma';

type dbConnectionCheck = 'healthy' | 'unhealthy';
export const checkDatabaseConnection = async (): Promise<dbConnectionCheck> => {
  try {
    const check: { result: dbConnectionCheck }[] = await db.$queryRaw`SELECT 'healthy' as result`;
    return check[0].result;
  } catch (error) {
    console.error('Database connection error:', error);
    return 'unhealthy';
  }
};
