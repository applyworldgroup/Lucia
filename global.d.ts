import { PrismaClient } from '@prisma/client';

declare global {
  // Add your custom global properties here
  var prisma: PrismaClient | undefined;
}

// To ensure this file is treated as a module
export {};
