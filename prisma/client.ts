// lib/prisma.ts or server/db.ts

import { PrismaClient } from '@prisma/client';

// This is necessary to prevent the "Already 10 Prisma Clients are actively running" error
// during development with Next.js hot reloading.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: Add logging for queries in development
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
