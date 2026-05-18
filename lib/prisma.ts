import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Validate DATABASE_URL early to fail fast with a clear error
if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.trim()) {
  throw new Error(
    "DATABASE_URL environment variable is required but not set or empty. " +
    "Please check your .env.local or environment configuration."
  );
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
