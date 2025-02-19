/* eslint-disable */
import { PrismaClient, Prisma } from '@prisma/client';
declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'info', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
      { level: 'error', emit: 'stdout' },
    ],
  });

// @ts-ignore
db.$on('query', (e: Prisma.QueryEvent) => {
  console.debug(`timestamp: ${e.timestamp}`);
  console.debug(`Params: ${e.params}`);
  console.debug(`Query: ${e.query}`);
  console.debug(`Duration: ${e.duration}ms`);
});

if (process.env.STAGE !== 'prod') globalThis.prisma = db;
