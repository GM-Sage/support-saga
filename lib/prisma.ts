// /lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Extend the global interface to include PrismaClient
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Instantiate a new PrismaClient.
 * The 'log' option is set to log all queries for debugging purposes.
 * In production, you might want to limit or remove logging for performance and security.
 */
const prisma = global.prisma || new PrismaClient({
  log: ["query"], // Logs all queries. Adjust as needed.
});

/**
 * If we're in a development environment, attach the PrismaClient instance to the global object.
 * This prevents multiple instances of PrismaClient in development due to module reloading.
 */
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export { prisma };